import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useServices } from '@/contexts/ServicesContext';
import ServiceFormModal from '@/components/admin/ServiceFormModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ManageServices = () => {
  const { services, loading, deleteService } = useServices();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (serviceId, serviceName) => {
    try {
      await deleteService(serviceId);
      toast({
        title: '🗑️ Service Deleted',
        description: `"${serviceName}" has been successfully removed.`,
      });
    } catch (error) {
      toast({
        title: 'Error Deleting Service',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    }
  };
  
  if (loading) return <p className="text-center py-8">Loading services...</p>;

  return (
    <>
      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold flex items-center">
              <Wrench className="mr-2 h-5 w-5" />
              Manage Services
            </CardTitle>
            <CardDescription>
              Add, edit, or remove services from the website.
            </CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services && services.length > 0 ? (
              services.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    {/* ✅ Show all images instead of single image */}
                    {Array.isArray(service.images) && service.images.length > 0 ? (
                      <div className="flex space-x-2">
                        {service.images.map((imgUrl, idx) => (
                          <img
                            key={idx}
                            src={imgUrl}
                            alt={`${service.name} image ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-md border"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-lg text-gray-800">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.category}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            service "{service.name}" from your website.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(service.id, service.name)}>
                            Yes, delete it
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No services found.</p>
                <p>Click "Add New Service" to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ServiceFormModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        service={editingService}
      />
    </>
  );
};

export default ManageServices;
