-- Breevia 个人定制养生平台数据库架构

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 用户健康档案表 (扩展 Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_health_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    
    -- 基本健康信息
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    height DECIMAL(5,2), -- cm
    weight DECIMAL(5,2), -- kg
    activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active')) DEFAULT 'moderately_active',
    
    -- 体质分析
    body_constitution TEXT CHECK (body_constitution IN ('qi_deficiency', 'yang_deficiency', 'yin_deficiency', 'phlegm_dampness', 'damp_heat', 'blood_stasis', 'qi_stagnation', 'special_constitution', 'balanced')) DEFAULT 'balanced',
    
    -- 健康目标
    health_goals TEXT[] DEFAULT '{}', -- ['weight_loss', 'muscle_gain', 'energy_boost', 'immune_support', 'anti_aging', 'disease_prevention']
    
    -- 过敏信息
    allergies TEXT[] DEFAULT '{}',
    food_intolerances TEXT[] DEFAULT '{}',
    
    -- 健康状况
    medical_conditions TEXT[] DEFAULT '{}',
    current_medications TEXT[] DEFAULT '{}',
    
    -- 饮食偏好
    dietary_preferences TEXT[] DEFAULT '{}', -- ['vegetarian', 'vegan', 'keto', 'paleo', 'mediterranean', 'low_carb']
    
    -- 用户偏好设置
    preferences JSONB DEFAULT '{
        "theme": "light",
        "language": "zh-CN",
        "notification_settings": {
            "meal_reminders": true,
            "supplement_reminders": true,
            "health_check_reminders": true
        },
        "privacy_settings": {
            "data_sharing": false,
            "anonymous_analytics": true
        }
    }',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 食谱数据库
CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cuisine_type TEXT, -- '中式', '西式', '日式', '地中海式' 等
    
    -- 营养信息
    calories_per_serving DECIMAL(8,2),
    protein_g DECIMAL(6,2),
    carbs_g DECIMAL(6,2),
    fat_g DECIMAL(6,2),
    fiber_g DECIMAL(6,2),
    sodium_mg DECIMAL(8,2),
    
    -- 食谱属性
    servings INTEGER DEFAULT 1,
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
    
    -- 分类和标签
    meal_type TEXT[] DEFAULT '{}', -- ['breakfast', 'lunch', 'dinner', 'snack']
    dietary_tags TEXT[] DEFAULT '{}', -- ['low_carb', 'high_protein', 'anti_inflammatory', 'detox']
    health_benefits TEXT[] DEFAULT '{}', -- ['boost_immunity', 'improve_digestion', 'increase_energy']
    
    -- 适用体质
    suitable_constitutions TEXT[] DEFAULT '{}',
    
    -- 食材和做法
    ingredients JSONB NOT NULL, -- [{"name": "鸡胸肉", "amount": "200g", "nutrition": {...}}]
    instructions JSONB NOT NULL, -- [{"step": 1, "description": "...", "time": 5}]
    
    -- 中医食疗信息
    tcm_properties JSONB DEFAULT '{}', -- {"nature": "warm", "flavor": "sweet", "meridian": ["spleen", "stomach"]}
    
    -- 评分和统计
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- 图片和媒体
    image_url TEXT,
    video_url TEXT,
    
    created_by UUID REFERENCES public.user_health_profiles(id),
    is_verified BOOLEAN DEFAULT FALSE, -- 专业营养师验证
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 补剂数据库
CREATE TABLE IF NOT EXISTS public.supplements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    common_names TEXT[] DEFAULT '{}', -- 常见别名
    category TEXT NOT NULL, -- 'vitamin', 'mineral', 'amino_acid', 'herbal', 'probiotic', 'enzyme'
    
    -- 基本信息
    description TEXT,
    main_ingredients TEXT[] NOT NULL,
    
    -- 补剂形态和类型
    form_type TEXT, -- 'tablet', 'capsule', 'powder', 'liquid', 'gummy'
    dosage_forms JSONB, -- [{"form": "capsule", "strength": "100mg"}, {"form": "powder", "strength": "5g"}]
    
    -- 有效性信息
    bioavailability_info JSONB, -- {"type": "reduced/oxidized", "absorption_rate": "high", "best_with": "fat"}
    
    -- 推荐剂量
    recommended_dosage JSONB, -- {"daily_min": "100mg", "daily_max": "300mg", "timing": "with_meals"}
    
    -- 健康益处
    health_benefits TEXT[] DEFAULT '{}',
    supported_conditions TEXT[] DEFAULT '{}',
    
    -- 适用人群
    target_demographics TEXT[] DEFAULT '{}', -- ['adults', 'elderly', 'athletes', 'pregnant_women']
    suitable_constitutions TEXT[] DEFAULT '{}',
    
    -- 科学证据
    evidence_level TEXT CHECK (evidence_level IN ('strong', 'moderate', 'limited', 'insufficient')) DEFAULT 'moderate',
    clinical_studies JSONB DEFAULT '[]', -- [{"title": "...", "year": 2023, "url": "..."}]
    
    -- 安全性信息
    side_effects TEXT[] DEFAULT '{}',
    contraindications TEXT[] DEFAULT '{}',
    drug_interactions TEXT[] DEFAULT '{}',
    
    -- 质量和来源
    quality_certifications TEXT[] DEFAULT '{}', -- ['GMP', 'USP', '有机认证']
    source_info TEXT,
    
    -- 价格信息
    price_range JSONB, -- {"min": 50, "max": 200, "currency": "CNY", "per_unit": "bottle"}
    
    -- 评分
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户食谱收藏和评价
CREATE TABLE IF NOT EXISTS public.user_recipe_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_health_profiles(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
    
    interaction_type TEXT CHECK (interaction_type IN ('viewed', 'bookmarked', 'made', 'rated', 'shared')) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    notes TEXT, -- 用户制作笔记
    modifications JSONB, -- 用户对食谱的修改
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id, interaction_type)
);

-- 用户补剂使用记录
CREATE TABLE IF NOT EXISTS public.user_supplement_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_health_profiles(id) ON DELETE CASCADE,
    supplement_id UUID REFERENCES public.supplements(id) ON DELETE CASCADE,
    
    -- 使用计划
    dosage TEXT NOT NULL, -- "100mg"
    frequency TEXT NOT NULL, -- "daily", "twice_daily", "weekly"
    timing TEXT[], -- ["morning", "with_breakfast"]
    
    -- 周期信息
    start_date DATE NOT NULL,
    planned_end_date DATE,
    actual_end_date DATE,
    
    -- 目标和原因
    purpose TEXT[], -- 使用目的
    expected_benefits TEXT[],
    
    -- 效果记录
    effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5),
    side_effects_experienced TEXT[],
    notes TEXT,
    
    -- 状态
    status TEXT CHECK (status IN ('planned', 'active', 'paused', 'completed', 'discontinued')) DEFAULT 'planned',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 健康计划和方案
CREATE TABLE IF NOT EXISTS public.health_plans (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_health_profiles(id) ON DELETE CASCADE,
    
    name TEXT NOT NULL,
    description TEXT,
    plan_type TEXT CHECK (plan_type IN ('nutrition', 'supplement', 'comprehensive', 'condition_specific')) NOT NULL,
    
    -- 计划详情
    duration_weeks INTEGER,
    target_goals TEXT[] NOT NULL,
    
    -- 阶段性安排
    phases JSONB, -- [{"phase": 1, "weeks": 4, "focus": "detox", "adjustments": {...}}]
    
    -- 饮食安排
    meal_plan_ids UUID[], -- 关联的食谱ID
    nutrition_targets JSONB, -- {"calories": 1800, "protein_g": 120, "carbs_g": 150}
    
    -- 补剂安排
    supplement_plan_ids UUID[], -- 关联的补剂计划ID
    
    -- 监测指标
    tracking_metrics TEXT[], -- ['weight', 'energy_level', 'sleep_quality', 'mood']
    
    -- 进度和状态
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed', 'abandoned')) DEFAULT 'draft',
    
    -- 专业指导
    created_by_professional BOOLEAN DEFAULT FALSE,
    professional_notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 健康日志
CREATE TABLE IF NOT EXISTS public.health_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_health_profiles(id) ON DELETE CASCADE,
    
    log_date DATE NOT NULL,
    
    -- 身体指标
    weight DECIMAL(5,2),
    body_fat_percentage DECIMAL(4,2),
    muscle_mass DECIMAL(5,2),
    blood_pressure JSONB, -- {"systolic": 120, "diastolic": 80}
    
    -- 主观感受 (1-10 分)
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
    stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
    
    -- 饮食记录
    meals_consumed JSONB, -- [{"meal": "breakfast", "recipe_id": "...", "portion": 1.0}]
    water_intake_ml INTEGER,
    
    -- 补剂记录
    supplements_taken JSONB, -- [{"supplement_id": "...", "dosage": "100mg", "time": "morning"}]
    
    -- 运动记录
    exercise_log JSONB, -- [{"type": "cardio", "duration": 30, "intensity": "moderate"}]
    
    -- 症状和感受
    symptoms TEXT[],
    notes TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI 健康顾问对话记录
CREATE TABLE IF NOT EXISTS public.health_ai_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_health_profiles(id) ON DELETE CASCADE,
    
    agent_type TEXT CHECK (agent_type IN ('nutritionist', 'pharmacist', 'physician', 'trainer')) NOT NULL,
    session_title TEXT NOT NULL,
    
    -- 对话内容
    messages JSONB DEFAULT '[]', -- [{"role": "user/assistant", "content": "...", "timestamp": "..."}]
    
    -- 会话上下文
    context JSONB DEFAULT '{}', -- 当前讨论的健康问题、目标等
    
    -- 生成的建议
    recommendations JSONB DEFAULT '[]', -- [{"type": "recipe/supplement/lifestyle", "content": {...}}]
    
    status TEXT CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_user_health_profiles_constitution ON public.user_health_profiles(body_constitution);
CREATE INDEX IF NOT EXISTS idx_user_health_profiles_goals ON public.user_health_profiles USING GIN(health_goals);

CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON public.recipes USING GIN(meal_type);
CREATE INDEX IF NOT EXISTS idx_recipes_dietary_tags ON public.recipes USING GIN(dietary_tags);
CREATE INDEX IF NOT EXISTS idx_recipes_constitutions ON public.recipes USING GIN(suitable_constitutions);
CREATE INDEX IF NOT EXISTS idx_recipes_rating ON public.recipes(rating DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_name_search ON public.recipes USING GIN(name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_supplements_category ON public.supplements(category);
CREATE INDEX IF NOT EXISTS idx_supplements_benefits ON public.supplements USING GIN(health_benefits);
CREATE INDEX IF NOT EXISTS idx_supplements_conditions ON public.supplements USING GIN(supported_conditions);
CREATE INDEX IF NOT EXISTS idx_supplements_constitutions ON public.supplements USING GIN(suitable_constitutions);

CREATE INDEX IF NOT EXISTS idx_user_recipe_interactions_user ON public.user_recipe_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_recipe_interactions_recipe ON public.user_recipe_interactions(recipe_id);

CREATE INDEX IF NOT EXISTS idx_supplement_plans_user ON public.user_supplement_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_supplement_plans_status ON public.user_supplement_plans(status);

CREATE INDEX IF NOT EXISTS idx_health_plans_user ON public.health_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_health_plans_type ON public.health_plans(plan_type);

CREATE INDEX IF NOT EXISTS idx_health_logs_user_date ON public.health_logs(user_id, log_date DESC);

CREATE INDEX IF NOT EXISTS idx_health_ai_sessions_user ON public.health_ai_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_health_ai_sessions_agent ON public.health_ai_sessions(agent_type);

-- 创建更新时间戳的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要自动更新时间戳的表添加触发器
CREATE TRIGGER update_user_health_profiles_updated_at BEFORE UPDATE ON public.user_health_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON public.recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplements_updated_at BEFORE UPDATE ON public.supplements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplement_plans_updated_at BEFORE UPDATE ON public.user_supplement_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_plans_updated_at BEFORE UPDATE ON public.health_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_ai_sessions_updated_at BEFORE UPDATE ON public.health_ai_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 设置行级安全策略 (RLS)
ALTER TABLE public.user_health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_recipe_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_supplement_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_ai_sessions ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "Users can view own health profile" ON public.user_health_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own health profile" ON public.user_health_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own recipe interactions" ON public.user_recipe_interactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own recipe interactions" ON public.user_recipe_interactions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own supplement plans" ON public.user_supplement_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own supplement plans" ON public.user_supplement_plans
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own health plans" ON public.health_plans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own health plans" ON public.health_plans
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own health logs" ON public.health_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own health logs" ON public.health_logs
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own AI sessions" ON public.health_ai_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own AI sessions" ON public.health_ai_sessions
    FOR ALL USING (auth.uid() = user_id);

-- 食谱和补剂对所有认证用户开放读取
CREATE POLICY "Authenticated users can view recipes" ON public.recipes
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view supplements" ON public.supplements
    FOR SELECT USING (auth.role() = 'authenticated');

-- 插入示例数据

-- 示例食谱
INSERT INTO public.recipes (name, description, cuisine_type, calories_per_serving, protein_g, carbs_g, fat_g, fiber_g, servings, prep_time_minutes, cook_time_minutes, meal_type, dietary_tags, health_benefits, suitable_constitutions, ingredients, instructions, tcm_properties, rating, review_count) VALUES
('养生银耳莲子汤', '滋阴润燥，补脾益气的经典汤品，适合秋冬季节食用', '中式', 150, 4.2, 32.5, 0.8, 2.1, 2, 15, 45, ARRAY['breakfast', 'snack'], ARRAY['low_fat', 'gluten_free', 'anti_aging'], ARRAY['improve_skin', 'boost_immunity', 'aid_digestion'], ARRAY['yin_deficiency', 'qi_deficiency'], 
'[{"name": "银耳", "amount": "15g", "nutrition": {"calories": 20, "protein": 2.1}}, {"name": "莲子", "amount": "30g", "nutrition": {"calories": 89, "protein": 4.2}}, {"name": "冰糖", "amount": "适量", "nutrition": {"calories": 40}}]'::jsonb,
'[{"step": 1, "description": "银耳提前泡发，撕成小朵", "time": 15}, {"step": 2, "description": "莲子去心，清洗干净", "time": 5}, {"step": 3, "description": "将银耳、莲子放入锅中，加水炖煮45分钟", "time": 45}, {"step": 4, "description": "最后加入冰糖调味即可", "time": 2}]'::jsonb,
'{"nature": "neutral", "flavor": "sweet", "meridian": ["lung", "stomach"], "effects": ["nourish_yin", "moisten_dryness"]}'::jsonb,
4.6, 23),

('黑芝麻核桃补肾粥', '补肾益精，乌发养颜的营养粥品', '中式', 280, 8.5, 45.2, 12.3, 5.2, 2, 10, 30, ARRAY['breakfast'], ARRAY['high_protein', 'brain_food', 'anti_aging'], ARRAY['improve_memory', 'strengthen_kidney', 'anti_aging'], ARRAY['kidney_yang_deficiency', 'qi_deficiency'], 
'[{"name": "黑芝麻", "amount": "20g", "nutrition": {"calories": 113, "protein": 4.3}}, {"name": "核桃仁", "amount": "25g", "nutrition": {"calories": 163, "protein": 3.8}}, {"name": "黑米", "amount": "50g", "nutrition": {"calories": 180, "protein": 4.1}}]'::jsonb,
'[{"step": 1, "description": "黑芝麻炒香，核桃仁压碎", "time": 5}, {"step": 2, "description": "黑米提前浸泡2小时", "time": 2}, {"step": 3, "description": "将所有材料放入锅中，加水煮粥30分钟", "time": 30}]'::jsonb,
'{"nature": "warm", "flavor": "sweet", "meridian": ["kidney", "liver"], "effects": ["tonify_kidney", "nourish_essence"]}'::jsonb,
4.8, 34);

-- 示例补剂
INSERT INTO public.supplements (name, common_names, category, description, main_ingredients, form_type, dosage_forms, bioavailability_info, recommended_dosage, health_benefits, supported_conditions, target_demographics, suitable_constitutions, evidence_level, side_effects, contraindications, rating, review_count) VALUES
('还原型辅酶Q10', ARRAY['泛醌醇', 'Ubiquinol'], 'antioxidant', '活性形式的辅酶Q10，比氧化型具有更好的生物利用度和抗氧化效果', ARRAY['Ubiquinol'], 'capsule',
'[{"form": "软胶囊", "strength": "100mg"}, {"form": "软胶囊", "strength": "200mg"}]'::jsonb,
'{"type": "reduced", "absorption_rate": "8倍于氧化型", "best_with": "脂肪类食物", "stability": "较氧化型敏感"}'::jsonb,
'{"daily_min": "100mg", "daily_max": "300mg", "timing": "随餐服用", "duration": "长期服用"}'::jsonb,
ARRAY['心血管保护', '抗氧化', '提高能量', '延缓衰老'], ARRAY['心脏病', '高血压', '疲劳综合征'], ARRAY['中老年人', '心血管高危人群'], ARRAY['qi_deficiency', 'yang_deficiency'], 'strong',
ARRAY['偶有胃肠不适'], ARRAY['孕妇哺乳期', '正在服用华法林'], 4.7, 156),

('维生素D3', ARRAY['胆钙化醇', 'Cholecalciferol'], 'vitamin', '天然形式的维生素D，促进钙磷吸收，维护骨骼健康和免疫功能', ARRAY['Cholecalciferol'], 'capsule',
'[{"form": "软胶囊", "strength": "1000IU"}, {"form": "软胶囊", "strength": "2000IU"}, {"form": "滴剂", "strength": "400IU/滴"}]'::jsonb,
'{"type": "D3 vs D2", "absorption_rate": "D3比D2效果好2-3倍", "best_with": "脂肪", "storage": "避光保存"}'::jsonb,
'{"daily_min": "1000IU", "daily_max": "4000IU", "timing": "随餐服用", "test_recommended": "血清25(OH)D检测"}'::jsonb,
ARRAY['骨骼健康', '免疫调节', '情绪改善', '肌肉功能'], ARRAY['骨质疏松', '免疫力低下', '季节性抑郁'], ARRAY['所有年龄段', '缺乏阳光照射人群'], ARRAY['yang_deficiency', 'qi_deficiency'], 'strong',
ARRAY['过量可能导致高钙血症'], ARRAY['高钙血症', '肾结石'], 4.5, 289);

-- 示例健康计划
INSERT INTO public.health_plans (user_id, name, description, plan_type, duration_weeks, target_goals, phases, nutrition_targets, tracking_metrics, status) VALUES
(NULL, '春季养肝排毒计划', '基于中医理论的春季养生方案，重点调养肝脏功能', 'comprehensive', 8, ARRAY['liver_detox', 'energy_boost', 'skin_improvement'],
'[{"phase": 1, "weeks": 2, "focus": "清肝火", "dietary_emphasis": "绿叶蔬菜，清淡饮食"}, {"phase": 2, "weeks": 3, "focus": "疏肝气", "dietary_emphasis": "柑橘类，坚果"}, {"phase": 3, "weeks": 3, "focus": "养肝血", "dietary_emphasis": "红枣，枸杞，深色蔬菜"}]'::jsonb,
'{"calories": 1600, "protein_g": 80, "fiber_g": 35, "antioxidants": "丰富"}'::jsonb,
ARRAY['energy_level', 'skin_condition', 'sleep_quality', 'mood'], 'draft');
