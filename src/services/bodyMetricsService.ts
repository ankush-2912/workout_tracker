
import { supabase } from "@/integrations/supabase/client";
import { BodyMetric } from "@/types/workout";

export const fetchBodyMetricsFromSupabase = async (userId: string) => {
  try {
    // Using raw query to avoid TypeScript issues since the table was just created
    const { data, error } = await supabase
      .from('body_metrics')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    return data as BodyMetric[] || [];
  } catch (error) {
    console.error('Error loading body metrics from Supabase:', error);
    throw error;
  }
};

export const saveBodyMetricToSupabase = async (bodyMetric: BodyMetric, userId: string) => {
  try {
    const supabaseBodyMetric = {
      id: bodyMetric.id,
      date: bodyMetric.date,
      weight: bodyMetric.weight,
      savedat: bodyMetric.savedAt,
      user_id: userId
    };
    
    let response;
    if (bodyMetric.id) {
      // Update existing body metric
      response = await supabase
        .from('body_metrics')
        .update(supabaseBodyMetric)
        .eq('id', bodyMetric.id)
        .eq('user_id', userId);
    } else {
      // Insert new body metric
      response = await supabase
        .from('body_metrics')
        .insert(supabaseBodyMetric);
    }
    
    if (response.error) {
      throw response.error;
    }
    
    return { success: true, bodyMetric };
  } catch (error) {
    console.error('Error saving body metric to Supabase:', error);
    throw error;
  }
};

export const deleteBodyMetricFromSupabase = async (id: string, userId: string) => {
  try {
    // Using raw query to avoid TypeScript issues since the table was just created
    const { error } = await supabase
      .from('body_metrics')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);
      
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting body metric from Supabase:', error);
    throw error;
  }
};

export const migrateLocalBodyMetricsToSupabase = async (
  localBodyMetrics: BodyMetric[], 
  existingBodyMetrics: BodyMetric[], 
  userId: string
) => {
  try {
    if (localBodyMetrics.length === 0) return { success: true };
    
    // Check which body metrics need to be uploaded (not already in Supabase)
    const existingIds = new Set(existingBodyMetrics.map(m => m.id));
    const metricsToUpload = localBodyMetrics
      .filter(m => !existingIds.has(m.id))
      .map(m => ({
        id: m.id,
        date: m.date,
        weight: m.weight,
        savedat: m.savedAt || new Date().toISOString(),
        user_id: userId
      }));
    
    if (metricsToUpload.length === 0) return { success: true };
    
    // Using raw query to avoid TypeScript issues since the table was just created
    const { error } = await supabase
      .from('body_metrics')
      .insert(metricsToUpload);
      
    if (error) throw error;
    
    return { 
      success: true, 
      count: metricsToUpload.length 
    };
    
  } catch (error) {
    console.error("Error migrating body metrics to Supabase:", error);
    throw error;
  }
};
