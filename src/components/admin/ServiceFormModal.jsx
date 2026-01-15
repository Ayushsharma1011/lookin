import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useServices } from '@/contexts/ServicesContext';
import { serviceCategories } from '@/data/services';
import { supabase } from '@/lib/customSupabaseClient'; // ✅ make sure this is configured

const ServiceFormModal = ({ isOpen, setIsOpen, service }) => {
  const { addService, updateService } = useServices();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    about: '',
    location: 'Dharamshala',
    images: [],
    rating: 4.5,
    contact: { phone: '', email: '' },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        id: service.id,
        name: service.name || '',
        category: service.category || '',
        description: service.description || '',
        about: service.about || '',
        location: service.location || 'Dharamshala',
        images: service.images || [],
        rating: service.rating || 4.5,
        contact: service.contact || { phone: '', email: '' },
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        about: '',
        location: 'Dharamshala',
        images: [],
        rating: 4.5,
        contact: { phone: '', email: '' },
      });
    }
  }, [service, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  // ✅ multiple file upload
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (formData.images.length + files.length > 3) {
      toast({
        title: "Max 3 images allowed",
        description: "Please remove some before adding new ones.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    for (let file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from("businesses")
        .upload(`services/${fileName}`, file);

      if (error) {
        console.error(error);
        toast({
          title: "Upload Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("businesses")
          .getPublicUrl(`services/${fileName}`);
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ enforce 50 characters max on "about"
    if (!/^[A-Za-z\s]*$/.test(formData.about)) {
      toast({
        title: 'Invalid About',
        description: 'The about section can only contain alphabets and spaces.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.about.length > 50) {
      toast({
        title: 'Too Long',
        description: 'The about section must be 50 characters or fewer.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (service) {
        await updateService(formData);
        toast({
          title: '✅ Service Updated',
          description: `${formData.name} has been successfully updated.`,
        });
      } else {
        const { id, ...newServiceData } = formData;
        await addService(newServiceData);
        toast({
          title: '✨ Service Added',
          description: `${formData.name} has been successfully added to the website.`,
        });
      }
      setIsOpen(false);
    } catch (error) {
      toast({
        title: 'Error Saving Service',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
          <DialogDescription>
            {service ? 'Make changes to this service.' : 'Fill in the details for the new service.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Name</label>
            <Input id="name" value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="col-span-3" required />
          </div>

          {/* Category */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right">Category</label>
            <select id="category" value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="col-span-3 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" required>
              <option value="">Select a category</option>
              {serviceCategories.filter(c => c.name !== 'All').map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* ✅ About (only alphabets, max 50 characters) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="about" className="text-right">About</label>
            <Input
              id="about"
              value={formData.about}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value) && value.length <= 50) {
                  handleInputChange('about', value);
                }
              }}
              placeholder="Max 50 characters (alphabets only)"
              className="col-span-3"
              required
            />
          </div>

          {/* Description */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">Description</label>
            <textarea id="description" value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="col-span-3 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required />
          </div>

          {/* Images */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right">Images</label>
            <div className="col-span-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="flex space-x-2 mt-2">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt="service"
                      className="w-16 h-16 object-cover rounded-md border" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="phone" className="text-right">Phone</label>
            <Input id="phone" value={formData.contact.phone}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              className="col-span-3" />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="email" className="text-right">Email</label>
            <Input id="email" type="email" value={formData.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              className="col-span-3" />
          </div>

          {/* ✅ Location */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="location" className="text-right">Location</label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter service location"
              className="col-span-3"
              required
            />
          </div>

          {/* ✅ Rating */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="rating" className="text-right">Rating</label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
              placeholder="Enter rating (0 - 5)"
              className="col-span-3"
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading || uploading}>
              {isLoading || uploading ? 'Saving...' : (service ? 'Save Changes' : 'Add Service')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormModal;
