// src/contexts/ReviewsContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/customSupabaseClient";

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews from DB
  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")   // 👈 your table name
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error.message);
    } else {
      setReviews(data);
    }
    setLoading(false);
  };

  // Approve review (set approved = true)
  const approveReview = async (id) => {
    const { data, error } = await supabase
      .from("reviews")
      .update({ Approved: true })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }
    // Update state
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, Approved: true } : r))
    );
    return data;
  };

  // Delete review
  const deleteReview = async (id) => {
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) {
      throw error;
    }
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Load on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        loading,
        fetchReviews,
        approveReview,
        deleteReview,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

// Hook for easy usage
export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};
