
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const ServicesContext = createContext();

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};

export const ServicesProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*');
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();

    const channel = supabase.channel('public:services')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, (payload) => {
        fetchServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchServices]);

  const addService = async (service) => {
    const { error } = await supabase.from('services').insert([service]).select();
    if (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  };

  const updateService = async (updatedService) => {
    const { id, ...serviceData } = updatedService;
    const { error } = await supabase.from('services').update(serviceData).eq('id', id);
    if (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  };

  const deleteService = async (serviceId) => {
    const { error } = await supabase.from('services').delete().eq('id', serviceId);
    if (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  };

  const value = {
    services,
    loading,
    addService,
    updateService,
    deleteService,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};
