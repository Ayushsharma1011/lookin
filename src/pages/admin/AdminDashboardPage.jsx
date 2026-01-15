import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Building, ListTodo, Wrench, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PendingListings from '@/components/admin/PendingListings';
import ManageServices from '@/components/admin/ManageServices';
import ManageReviews from '@/components/admin/ManageReviews';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/admin/login');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Look in Dharamshala</title>
        <meta name="description" content="Admin dashboard for managing business listings and website content." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3"> 
                <TabsTrigger value="listings">
                  <ListTodo className="mr-2 h-4 w-4" /> Pending Listings
                </TabsTrigger>
                <TabsTrigger value="services">
                  <Wrench className="mr-2 h-4 w-4" /> Manage Services
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <MessageSquare className="mr-2 h-4 w-4" /> Manage Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings">
                <PendingListings />
              </TabsContent>
              <TabsContent value="services">
                <ManageServices />
              </TabsContent>
              <TabsContent value="reviews">
                <ManageReviews />   {/* ✅ NEW TAB */}
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardPage;
