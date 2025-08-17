-- 创建 Breevia 应用的数据库表结构

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 用户表 (扩展 Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    preferences JSONB DEFAULT '{
        "theme": "light",
        "language": "zh-CN",
        "notification_settings": {
            "email_notifications": true,
            "push_notifications": true,
            "reminder_frequency": "daily"
        },
        "interests": [],
        "privacy_settings": {
            "data_sharing": false,
            "analytics": true
        }
    }',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 生活指导表
CREATE TABLE IF NOT EXISTS public.life_guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT CHECK (category IN ('health', 'work', 'lifestyle', 'relationships', 'finance', 'learning')) NOT NULL,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'paused')) DEFAULT 'pending',
    due_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[] DEFAULT '{}',
    ai_generated BOOLEAN DEFAULT FALSE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 知识项目表
CREATE TABLE IF NOT EXISTS public.knowledge_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('article', 'video', 'course', 'book', 'podcast', 'tool')) NOT NULL,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
    estimated_time INTEGER, -- 分钟
    source_url TEXT,
    tags TEXT[] DEFAULT '{}',
    rating DECIMAL(2,1) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户-知识项目交互表
CREATE TABLE IF NOT EXISTS public.user_knowledge_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    knowledge_item_id UUID REFERENCES public.knowledge_items(id) ON DELETE CASCADE,
    interaction_type TEXT CHECK (interaction_type IN ('viewed', 'bookmarked', 'completed', 'rated', 'shared')) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, knowledge_item_id, interaction_type)
);

-- AI 代理会话表
CREATE TABLE IF NOT EXISTS public.ai_agent_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    agent_type TEXT CHECK (agent_type IN ('life_coach', 'knowledge_curator', 'task_manager', 'wellness_advisor')) NOT NULL,
    session_title TEXT NOT NULL,
    messages JSONB DEFAULT '[]',
    context JSONB DEFAULT '{}',
    status TEXT CHECK (status IN ('active', 'completed', 'archived')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以优化查询性能
CREATE INDEX IF NOT EXISTS idx_life_guides_user_id ON public.life_guides(user_id);
CREATE INDEX IF NOT EXISTS idx_life_guides_category ON public.life_guides(category);
CREATE INDEX IF NOT EXISTS idx_life_guides_status ON public.life_guides(status);
CREATE INDEX IF NOT EXISTS idx_life_guides_due_date ON public.life_guides(due_date);

CREATE INDEX IF NOT EXISTS idx_knowledge_items_category ON public.knowledge_items(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_items_difficulty ON public.knowledge_items(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_knowledge_items_rating ON public.knowledge_items(rating DESC);
CREATE INDEX IF NOT EXISTS idx_knowledge_items_tags ON public.knowledge_items USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_user_knowledge_interactions_user_id ON public.user_knowledge_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_knowledge_interactions_knowledge_item_id ON public.user_knowledge_interactions(knowledge_item_id);
CREATE INDEX IF NOT EXISTS idx_user_knowledge_interactions_type ON public.user_knowledge_interactions(interaction_type);

CREATE INDEX IF NOT EXISTS idx_ai_agent_sessions_user_id ON public.ai_agent_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_agent_sessions_agent_type ON public.ai_agent_sessions(agent_type);
CREATE INDEX IF NOT EXISTS idx_ai_agent_sessions_status ON public.ai_agent_sessions(status);

-- 创建更新时间戳的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要自动更新时间戳的表添加触发器
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_life_guides_updated_at BEFORE UPDATE ON public.life_guides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_knowledge_items_updated_at BEFORE UPDATE ON public.knowledge_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_agent_sessions_updated_at BEFORE UPDATE ON public.ai_agent_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 设置行级安全策略 (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.life_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_knowledge_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agent_sessions ENABLE ROW LEVEL SECURITY;

-- 用户只能访问自己的数据
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own life guides" ON public.life_guides
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own life guides" ON public.life_guides
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own life guides" ON public.life_guides
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own life guides" ON public.life_guides
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own knowledge interactions" ON public.user_knowledge_interactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own knowledge interactions" ON public.user_knowledge_interactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own knowledge interactions" ON public.user_knowledge_interactions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own AI sessions" ON public.ai_agent_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI sessions" ON public.ai_agent_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI sessions" ON public.ai_agent_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- 知识项目表对所有认证用户开放读取
CREATE POLICY "Authenticated users can view knowledge items" ON public.knowledge_items
    FOR SELECT USING (auth.role() = 'authenticated');

-- 插入一些示例数据
INSERT INTO public.knowledge_items (title, description, content, category, difficulty_level, estimated_time, tags, rating, review_count) VALUES
('时间管理的艺术', '学习如何有效管理时间，提高工作和生活效率', '时间管理是一项重要的生活技能...', 'article', 'beginner', 15, ARRAY['时间管理', '效率', '生产力'], 4.5, 128),
('健康饮食指南', '了解均衡饮食的重要性和实践方法', '健康的饮食习惯对身体和心理健康都有重要影响...', 'article', 'beginner', 20, ARRAY['健康', '饮食', '营养'], 4.7, 89),
('冥想入门课程', '学习基础冥想技巧，改善心理健康', '冥想是一种古老的修行方式，现代科学证明...', 'course', 'beginner', 30, ARRAY['冥想', '心理健康', '放松'], 4.8, 156),
('投资理财基础', '个人财务管理和投资入门知识', '理财是现代生活的必备技能...', 'course', 'intermediate', 60, ARRAY['理财', '投资', '财务'], 4.6, 234),
('深度工作法', '如何在分心的世界中专注工作', '在这个充满干扰的时代，深度工作变得越来越重要...', 'book', 'intermediate', 180, ARRAY['专注', '工作', '效率'], 4.9, 312);
