
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BodyMetric } from '@/types/workout';
import { loadBodyMetricsFromLocalStorage, updateBodyMetricsLocalStorage } from '@/utils/bodyMetricsStorage';
import { 
  fetchBodyMetricsFromSupabase,
  saveBodyMetricToSupabase,
  deleteBodyMetricFromSupabase,
  migrateLocalBodyMetricsToSupabase
} from '@/services/bodyMetricsService';

export const useBodyMetrics = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [bodyMetrics, setBodyMetrics] = useState<BodyMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load body metrics from Supabase for logged-in users, or from localStorage otherwise
  const loadBodyMetrics = async () => {
    setLoading(true);
    
    if (isAuthenticated && user) {
      try {
        const data = await fetchBodyMetricsFromSupabase(user.id);
        setBodyMetrics(data as BodyMetric[]);
        
        // Attempt to migrate any local body metrics to Supabase
        const localBodyMetrics = loadBodyMetricsFromLocalStorage();
        if (localBodyMetrics.length > 0) {
          const result = await migrateLocalBodyMetricsToSupabase(localBodyMetrics, data as BodyMetric[], user.id);
          if (result.success && result.count && result.count > 0) {
            toast({
              title: "Body metrics synced",
              description: `${result.count} local body metrics uploaded to your account`,
            });
            // Reload to get the newly added body metrics
            const updatedBodyMetrics = await fetchBodyMetricsFromSupabase(user.id);
            setBodyMetrics(updatedBodyMetrics as BodyMetric[]);
          }
        }
      } catch (error: any) {
        console.error('Error loading body metrics:', error);
        toast({
          title: "Error loading body metrics",
          description: error.message || "Failed to load your body metrics data",
          variant: "destructive",
        });
        
        // Fallback to localStorage
        const localBodyMetrics = loadBodyMetricsFromLocalStorage();
        setBodyMetrics(localBodyMetrics);
      }
    } else {
      // Not authenticated or Supabase not configured, use localStorage
      const localBodyMetrics = loadBodyMetricsFromLocalStorage();
      setBodyMetrics(localBodyMetrics);
    }
    
    setLoading(false);
  };

  // Save a body metric to Supabase for logged-in users, or to localStorage otherwise
  const saveBodyMetric = async (bodyMetric: BodyMetric) => {
    const bodyMetricToSave = {
      ...bodyMetric,
      id: bodyMetric.id || Date.now().toString(),
      savedAt: new Date().toISOString(),
    };

    if (isAuthenticated && user) {
      try {
        const result = await saveBodyMetricToSupabase(bodyMetricToSave, user.id);
        
        // Also update local state
        const updatedBodyMetrics = bodyMetric.id 
          ? bodyMetrics.map(m => m.id === bodyMetric.id ? bodyMetricToSave : m)
          : [...bodyMetrics, bodyMetricToSave];
          
        setBodyMetrics(updatedBodyMetrics);
        updateBodyMetricsLocalStorage(updatedBodyMetrics);
        
        return { success: true, bodyMetric: bodyMetricToSave };
      } catch (error: any) {
        console.error('Error saving body metric to Supabase:', error);
        toast({
          title: "Error saving body metric",
          description: error.message || "Failed to save your body metric",
          variant: "destructive",
        });
        return { success: false, error };
      }
    } else {
      // Not authenticated or Supabase not configured, save to localStorage
      try {
        const updatedBodyMetrics = bodyMetric.id 
          ? bodyMetrics.map(m => m.id === bodyMetric.id ? bodyMetricToSave : m)
          : [...bodyMetrics, bodyMetricToSave];
          
        setBodyMetrics(updatedBodyMetrics);
        updateBodyMetricsLocalStorage(updatedBodyMetrics);
        
        return { success: true, bodyMetric: bodyMetricToSave };
      } catch (error) {
        console.error("Error saving body metric to localStorage:", error);
        return { success: false, error };
      }
    }
  };

  // Delete a body metric from Supabase for logged-in users, or from localStorage otherwise
  const deleteBodyMetric = async (id: string) => {
    if (isAuthenticated && user) {
      try {
        await deleteBodyMetricFromSupabase(id, user.id);
        
        // Also update local state
        const updatedBodyMetrics = bodyMetrics.filter(metric => metric.id !== id);
        setBodyMetrics(updatedBodyMetrics);
        updateBodyMetricsLocalStorage(updatedBodyMetrics);
        
        return { success: true };
      } catch (error: any) {
        console.error('Error deleting body metric from Supabase:', error);
        toast({
          title: "Error deleting body metric",
          description: error.message || "Failed to delete your body metric",
          variant: "destructive",
        });
        return { success: false, error };
      }
    } else {
      // Not authenticated or Supabase not configured, delete from localStorage
      try {
        const updatedBodyMetrics = bodyMetrics.filter(metric => metric.id !== id);
        setBodyMetrics(updatedBodyMetrics);
        updateBodyMetricsLocalStorage(updatedBodyMetrics);
        
        return { success: true };
      } catch (error) {
        console.error("Error deleting body metric from localStorage:", error);
        return { success: false, error };
      }
    }
  };

  // Load body metrics when user status changes
  useEffect(() => {
    loadBodyMetrics();
  }, [isAuthenticated, user]);

  return { 
    bodyMetrics, 
    setBodyMetrics,
    loading,
    saveBodyMetric,
    deleteBodyMetric 
  };
};
