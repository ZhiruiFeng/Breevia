import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface Database {
  public: {
    Tables: {
      user_health_profiles: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url?: string
          age?: number
          gender?: 'male' | 'female' | 'other'
          height?: number
          weight?: number
          activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
          body_constitution: BodyConstitution
          health_goals: string[]
          allergies: string[]
          food_intolerances: string[]
          medical_conditions: string[]
          current_medications: string[]
          dietary_preferences: string[]
          preferences: UserPreferences
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string
          age?: number
          gender?: 'male' | 'female' | 'other'
          height?: number
          weight?: number
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
          body_constitution?: BodyConstitution
          health_goals?: string[]
          allergies?: string[]
          food_intolerances?: string[]
          medical_conditions?: string[]
          current_medications?: string[]
          dietary_preferences?: string[]
          preferences?: UserPreferences
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          avatar_url?: string
          age?: number
          gender?: 'male' | 'female' | 'other'
          height?: number
          weight?: number
          activity_level?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active'
          body_constitution?: BodyConstitution
          health_goals?: string[]
          allergies?: string[]
          food_intolerances?: string[]
          medical_conditions?: string[]
          current_medications?: string[]
          dietary_preferences?: string[]
          preferences?: UserPreferences
          updated_at?: string
        }
      }
      recipes: {
        Row: {
          id: string
          name: string
          description?: string
          cuisine_type?: string
          calories_per_serving?: number
          protein_g?: number
          carbs_g?: number
          fat_g?: number
          fiber_g?: number
          sodium_mg?: number
          servings: number
          prep_time_minutes?: number
          cook_time_minutes?: number
          difficulty_level: 'easy' | 'medium' | 'hard'
          meal_type: string[]
          dietary_tags: string[]
          health_benefits: string[]
          suitable_constitutions: string[]
          ingredients: RecipeIngredient[]
          instructions: RecipeInstruction[]
          tcm_properties: TCMProperties
          rating: number
          review_count: number
          view_count: number
          image_url?: string
          video_url?: string
          created_by?: string
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          cuisine_type?: string
          calories_per_serving?: number
          protein_g?: number
          carbs_g?: number
          fat_g?: number
          fiber_g?: number
          sodium_mg?: number
          servings?: number
          prep_time_minutes?: number
          cook_time_minutes?: number
          difficulty_level?: 'easy' | 'medium' | 'hard'
          meal_type?: string[]
          dietary_tags?: string[]
          health_benefits?: string[]
          suitable_constitutions?: string[]
          ingredients: RecipeIngredient[]
          instructions: RecipeInstruction[]
          tcm_properties?: TCMProperties
          rating?: number
          review_count?: number
          view_count?: number
          image_url?: string
          video_url?: string
          created_by?: string
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          cuisine_type?: string
          calories_per_serving?: number
          protein_g?: number
          carbs_g?: number
          fat_g?: number
          fiber_g?: number
          sodium_mg?: number
          servings?: number
          prep_time_minutes?: number
          cook_time_minutes?: number
          difficulty_level?: 'easy' | 'medium' | 'hard'
          meal_type?: string[]
          dietary_tags?: string[]
          health_benefits?: string[]
          suitable_constitutions?: string[]
          ingredients?: RecipeIngredient[]
          instructions?: RecipeInstruction[]
          tcm_properties?: TCMProperties
          rating?: number
          review_count?: number
          view_count?: number
          image_url?: string
          video_url?: string
          is_verified?: boolean
          updated_at?: string
        }
      }
      supplements: {
        Row: {
          id: string
          name: string
          common_names: string[]
          category: SupplementCategory
          description?: string
          main_ingredients: string[]
          form_type?: string
          dosage_forms?: DosageForm[]
          bioavailability_info?: BioavailabilityInfo
          recommended_dosage?: RecommendedDosage
          health_benefits: string[]
          supported_conditions: string[]
          target_demographics: string[]
          suitable_constitutions: string[]
          evidence_level: 'strong' | 'moderate' | 'limited' | 'insufficient'
          clinical_studies: ClinicalStudy[]
          side_effects: string[]
          contraindications: string[]
          drug_interactions: string[]
          quality_certifications: string[]
          source_info?: string
          price_range?: PriceRange
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          common_names?: string[]
          category: SupplementCategory
          description?: string
          main_ingredients: string[]
          form_type?: string
          dosage_forms?: DosageForm[]
          bioavailability_info?: BioavailabilityInfo
          recommended_dosage?: RecommendedDosage
          health_benefits?: string[]
          supported_conditions?: string[]
          target_demographics?: string[]
          suitable_constitutions?: string[]
          evidence_level?: 'strong' | 'moderate' | 'limited' | 'insufficient'
          clinical_studies?: ClinicalStudy[]
          side_effects?: string[]
          contraindications?: string[]
          drug_interactions?: string[]
          quality_certifications?: string[]
          source_info?: string
          price_range?: PriceRange
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          common_names?: string[]
          category?: SupplementCategory
          description?: string
          main_ingredients?: string[]
          form_type?: string
          dosage_forms?: DosageForm[]
          bioavailability_info?: BioavailabilityInfo
          recommended_dosage?: RecommendedDosage
          health_benefits?: string[]
          supported_conditions?: string[]
          target_demographics?: string[]
          suitable_constitutions?: string[]
          evidence_level?: 'strong' | 'moderate' | 'limited' | 'insufficient'
          clinical_studies?: ClinicalStudy[]
          side_effects?: string[]
          contraindications?: string[]
          drug_interactions?: string[]
          quality_certifications?: string[]
          source_info?: string
          price_range?: PriceRange
          rating?: number
          review_count?: number
          updated_at?: string
        }
      }
      user_recipe_interactions: {
        Row: {
          id: string
          user_id: string
          recipe_id: string
          interaction_type: 'viewed' | 'bookmarked' | 'made' | 'rated' | 'shared'
          rating?: number
          review?: string
          notes?: string
          modifications?: RecipeModification[]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipe_id: string
          interaction_type: 'viewed' | 'bookmarked' | 'made' | 'rated' | 'shared'
          rating?: number
          review?: string
          notes?: string
          modifications?: RecipeModification[]
          created_at?: string
        }
        Update: {
          interaction_type?: 'viewed' | 'bookmarked' | 'made' | 'rated' | 'shared'
          rating?: number
          review?: string
          notes?: string
          modifications?: RecipeModification[]
        }
      }
      user_supplement_plans: {
        Row: {
          id: string
          user_id: string
          supplement_id: string
          dosage: string
          frequency: string
          timing: string[]
          start_date: string
          planned_end_date?: string
          actual_end_date?: string
          purpose: string[]
          expected_benefits: string[]
          effectiveness_rating?: number
          side_effects_experienced: string[]
          notes?: string
          status: 'planned' | 'active' | 'paused' | 'completed' | 'discontinued'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          supplement_id: string
          dosage: string
          frequency: string
          timing?: string[]
          start_date: string
          planned_end_date?: string
          actual_end_date?: string
          purpose?: string[]
          expected_benefits?: string[]
          effectiveness_rating?: number
          side_effects_experienced?: string[]
          notes?: string
          status?: 'planned' | 'active' | 'paused' | 'completed' | 'discontinued'
          created_at?: string
          updated_at?: string
        }
        Update: {
          dosage?: string
          frequency?: string
          timing?: string[]
          planned_end_date?: string
          actual_end_date?: string
          purpose?: string[]
          expected_benefits?: string[]
          effectiveness_rating?: number
          side_effects_experienced?: string[]
          notes?: string
          status?: 'planned' | 'active' | 'paused' | 'completed' | 'discontinued'
          updated_at?: string
        }
      }
      health_plans: {
        Row: {
          id: string
          user_id: string
          name: string
          description?: string
          plan_type: 'nutrition' | 'supplement' | 'comprehensive' | 'condition_specific'
          duration_weeks?: number
          target_goals: string[]
          phases?: PlanPhase[]
          meal_plan_ids?: string[]
          nutrition_targets?: NutritionTargets
          supplement_plan_ids?: string[]
          tracking_metrics: string[]
          progress_percentage: number
          status: 'draft' | 'active' | 'paused' | 'completed' | 'abandoned'
          created_by_professional: boolean
          professional_notes?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string
          plan_type: 'nutrition' | 'supplement' | 'comprehensive' | 'condition_specific'
          duration_weeks?: number
          target_goals: string[]
          phases?: PlanPhase[]
          meal_plan_ids?: string[]
          nutrition_targets?: NutritionTargets
          supplement_plan_ids?: string[]
          tracking_metrics?: string[]
          progress_percentage?: number
          status?: 'draft' | 'active' | 'paused' | 'completed' | 'abandoned'
          created_by_professional?: boolean
          professional_notes?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string
          plan_type?: 'nutrition' | 'supplement' | 'comprehensive' | 'condition_specific'
          duration_weeks?: number
          target_goals?: string[]
          phases?: PlanPhase[]
          meal_plan_ids?: string[]
          nutrition_targets?: NutritionTargets
          supplement_plan_ids?: string[]
          tracking_metrics?: string[]
          progress_percentage?: number
          status?: 'draft' | 'active' | 'paused' | 'completed' | 'abandoned'
          created_by_professional?: boolean
          professional_notes?: string
          updated_at?: string
        }
      }
      health_logs: {
        Row: {
          id: string
          user_id: string
          log_date: string
          weight?: number
          body_fat_percentage?: number
          muscle_mass?: number
          blood_pressure?: BloodPressure
          energy_level?: number
          mood_score?: number
          sleep_quality?: number
          stress_level?: number
          meals_consumed?: MealLog[]
          water_intake_ml?: number
          supplements_taken?: SupplementLog[]
          exercise_log?: ExerciseLog[]
          symptoms: string[]
          notes?: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          log_date: string
          weight?: number
          body_fat_percentage?: number
          muscle_mass?: number
          blood_pressure?: BloodPressure
          energy_level?: number
          mood_score?: number
          sleep_quality?: number
          stress_level?: number
          meals_consumed?: MealLog[]
          water_intake_ml?: number
          supplements_taken?: SupplementLog[]
          exercise_log?: ExerciseLog[]
          symptoms?: string[]
          notes?: string
          created_at?: string
        }
        Update: {
          log_date?: string
          weight?: number
          body_fat_percentage?: number
          muscle_mass?: number
          blood_pressure?: BloodPressure
          energy_level?: number
          mood_score?: number
          sleep_quality?: number
          stress_level?: number
          meals_consumed?: MealLog[]
          water_intake_ml?: number
          supplements_taken?: SupplementLog[]
          exercise_log?: ExerciseLog[]
          symptoms?: string[]
          notes?: string
        }
      }
      health_ai_sessions: {
        Row: {
          id: string
          user_id: string
          agent_type: 'nutritionist' | 'pharmacist' | 'physician' | 'trainer'
          session_title: string
          messages: AIMessage[]
          context: Record<string, any>
          recommendations: AIRecommendation[]
          status: 'active' | 'completed' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agent_type: 'nutritionist' | 'pharmacist' | 'physician' | 'trainer'
          session_title: string
          messages?: AIMessage[]
          context?: Record<string, any>
          recommendations?: AIRecommendation[]
          status?: 'active' | 'completed' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          session_title?: string
          messages?: AIMessage[]
          context?: Record<string, any>
          recommendations?: AIRecommendation[]
          status?: 'active' | 'completed' | 'archived'
          updated_at?: string
        }
      }
    }
  }
}

// 中医体质类型
export type BodyConstitution = 
  | 'qi_deficiency'      // 气虚质
  | 'yang_deficiency'    // 阳虚质
  | 'yin_deficiency'     // 阴虚质
  | 'phlegm_dampness'    // 痰湿质
  | 'damp_heat'          // 湿热质
  | 'blood_stasis'       // 血瘀质
  | 'qi_stagnation'      // 气郁质
  | 'special_constitution' // 特禀质
  | 'balanced'           // 平和质

// 补剂分类类型
export type SupplementCategory = 
  | 'vitamin'
  | 'mineral' 
  | 'amino_acid'
  | 'herbal'
  | 'probiotic'
  | 'enzyme'
  | 'omega'
  | 'antioxidant'

// 用户偏好设置类型
export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh-CN' | 'en-US'
  notification_settings: {
    meal_reminders: boolean
    supplement_reminders: boolean
    health_check_reminders: boolean
  }
  privacy_settings: {
    data_sharing: boolean
    anonymous_analytics: boolean
  }
}

// 食谱相关类型
export interface RecipeIngredient {
  name: string
  amount: string
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

export interface RecipeInstruction {
  step: number
  description: string
  time?: number // 分钟
}

export interface TCMProperties {
  nature?: 'hot' | 'warm' | 'neutral' | 'cool' | 'cold'
  flavor?: string[] // ['sweet', 'bitter', 'sour', 'spicy', 'salty']
  meridian?: string[] // ['lung', 'heart', 'liver', 'spleen', 'kidney']
  effects?: string[] // ['nourish_yin', 'tonify_qi', 'clear_heat']
}

export interface RecipeModification {
  type: 'ingredient_substitution' | 'cooking_method' | 'seasoning'
  original: string
  modified: string
  reason?: string
}

// 补剂相关类型
export interface DosageForm {
  form: string // 'tablet', 'capsule', 'powder', 'liquid'
  strength: string // '100mg', '5g'
}

export interface BioavailabilityInfo {
  type?: string // 'reduced', 'oxidized'
  absorption_rate?: string
  best_with?: string
  stability?: string
}

export interface RecommendedDosage {
  daily_min?: string
  daily_max?: string
  timing?: string
  duration?: string
  test_recommended?: string
}

export interface ClinicalStudy {
  title: string
  year: number
  url?: string
  summary?: string
}

export interface PriceRange {
  min: number
  max: number
  currency: string
  per_unit: string
}

// 健康计划相关类型
export interface PlanPhase {
  phase: number
  weeks: number
  focus: string
  dietary_emphasis?: string
  supplement_focus?: string[]
  key_metrics?: string[]
}

export interface NutritionTargets {
  calories?: number
  protein_g?: number
  carbs_g?: number
  fat_g?: number
  fiber_g?: number
  water_ml?: number
  antioxidants?: string
}

// 健康日志相关类型
export interface BloodPressure {
  systolic: number
  diastolic: number
}

export interface MealLog {
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  recipe_id?: string
  recipe_name?: string
  portion: number
  calories?: number
}

export interface SupplementLog {
  supplement_id: string
  supplement_name: string
  dosage: string
  time: string
  taken: boolean
}

export interface ExerciseLog {
  type: string
  duration: number // 分钟
  intensity: 'low' | 'moderate' | 'high'
  calories_burned?: number
}

// AI 相关类型
export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  metadata?: Record<string, any>
}

export interface AIRecommendation {
  type: 'recipe' | 'supplement' | 'lifestyle' | 'exercise'
  title: string
  content: any
  reasoning?: string
  confidence_score?: number
}
