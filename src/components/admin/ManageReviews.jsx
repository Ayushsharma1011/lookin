import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Trash2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useReviews } from "@/contexts/ReviewsContext"; 
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

const ManageReviews = () => {
  const { reviews, loading, deleteReview, approveReview } = useReviews();
  const { toast } = useToast();

  const handleApprove = async (id) => {
    try {
      await approveReview(id);
      toast({
        title: "✅ Review Approved",
        description: "The review is now visible on your site.",
      });
    } catch (error) {
      toast({
        title: "Error Approving Review",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const handleDelete = async (id, Name) => {
    try {
      await deleteReview(id);
      toast({
        title: "🗑️ Review Deleted",
        description: `Review from "${Name}" has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Review",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  if (loading) return <p className="text-center py-8">Loading reviews...</p>;

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Manage Reviews
          </CardTitle>
          <CardDescription>
            Approve or remove user reviews for services.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 border rounded-lg flex items-center justify-between ${
                  review.Approved ? "opacity-90 bg-green-50" : "bg-white"
                }`}
              >
                <div>
                  <p className="font-bold text-lg text-gray-800">{review.Name}</p>
                  <p className="text-sm text-gray-600">Rating: {review.Rating}</p>
                  <p className="mt-1 text-gray-700">{review.Review}</p>
                  <p
                    className={`text-xs mt-1 font-medium ${
                      review.Approved ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {review.Approved ? "✅ Approved" : "⏳ Pending"}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {!review.Approved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleApprove(review.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Approve
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the review from "{review.Name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(review.id, review.Name)}
                        >
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
              <p>No reviews found.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageReviews;
