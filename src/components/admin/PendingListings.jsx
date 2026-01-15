import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';

const PendingListings = () => {
  const [pendingListings, setPendingListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPendingListings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching pending listings:', error);
      toast({ title: 'Error', description: 'Could not fetch pending listings.', variant: 'destructive' });
    } else {
      setPendingListings(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchPendingListings();
    const channel = supabase.channel('public:businesses')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'businesses' }, () => {
        fetchPendingListings();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPendingListings]);

  const handleApprove = async (listing) => {
    // ✅ Update status in businesses table
    const { error: updateError } = await supabase
      .from('businesses')
      .update({ status: 'approved' })
      .eq('id', listing.id);

    if (updateError) {
      toast({ title: 'Error', description: 'Could not approve listing.', variant: 'destructive' });
      return;
    }

    // ✅ Insert into services table with images + about
    const newService = {
      name: listing.businessName,
      category: listing.category,
      rating: 4.5,
      location: 'Dharamshala',
      description: listing.description,
      about: listing.about || "",
      owner: listing.ownerName,
      contact: {
        phone: listing.phone,
        email: listing.email,
      },
      images: listing.images || [],
    };

    const { error: insertError } = await supabase.from('services').insert([newService]).select();

    if (insertError) {
      toast({ title: 'Error', description: 'Could not add approved listing to services.', variant: 'destructive' });
    } else {
      toast({
        title: '✅ Listing Approved',
        description: `${listing.businessName} is now live on the site.`,
      });

      // ✅ Open WhatsApp and send styled message
      if (listing.phone) {
        const phoneNumber = listing.phone.replace(/\D/g, ""); // clean number

        const message = `
🎉 *Congratulations ${listing.ownerName}!* 🎉

Your business *${listing.businessName}* has been ✅ *approved* and is now live on *Look in Dharamshala* 🌐

📍 Location: Dharamshala  
📂 Category: ${listing.category}  

You can check your live listing here 👇  
🔗 https://lookindharamshala.synergyayush.com/

Thank you for trusting us! 🚀  

Regards,  
*Ayush Sharma*  
Look in Dharamshala
        `;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
      }
    }
  };

  const handleReject = async (listing) => {
    const { error } = await supabase
      .from('businesses')
      .update({ status: 'rejected' })
      .eq('id', listing.id);

    if (error) {
      toast({ title: 'Error', description: 'Could not reject listing.', variant: 'destructive' });
    } else {
      toast({
        title: '❌ Listing Rejected',
        description: `${listing.businessName} has been rejected.`,
        variant: 'destructive',
      });
    }
  };

  if (loading) return <p className="text-center py-8">Loading pending listings...</p>;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Pending Business Listings
        </CardTitle>
        <CardDescription>
          Review and approve or reject new business submissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingListings.length > 0 ? (
          <div className="space-y-4">
            {pendingListings.map((listing) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
              >
                {/* ✅ Images Preview */}
                {Array.isArray(listing.images) && listing.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3 md:mb-0 mr-4">
                    {listing.images.map((imgUrl, idx) => (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`Business ${listing.businessName} image ${idx + 1}`}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                    ))}
                  </div>
                )}

                <div className="flex-grow">
                  <p className="font-bold text-lg text-gray-800">{listing.businessName}</p>
                  <p className="text-sm text-gray-600">{listing.category} by {listing.ownerName}</p>
                  <p className="text-sm text-gray-500 mt-1">{listing.description}</p>
                  {listing.about && (
                    <p className="text-sm text-gray-500 mt-1"><strong>About:</strong> {listing.about}</p>
                  )}
                </div>

                <div className="flex space-x-2 flex-shrink-0">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={() => handleApprove(listing)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleReject(listing)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">No pending listings to review. Great job!</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingListings;
