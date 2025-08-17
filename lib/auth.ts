import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

// 登录函数
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// 注册函数
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  // 如果注册成功，创建用户档案
  if (data.user) {
    await createUserProfile(data.user.id, email, name)
  }
  
  return data
}

// 登出函数
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error getting current user:', error)
    return null
  }
  
  return user as AuthUser
}

// 创建用户档案
async function createUserProfile(userId: string, email: string, name: string) {
  const { error } = await supabase
    .from('users')
    .insert({
      id: userId,
      email,
      name,
    })
  
  if (error) {
    console.error('Error creating user profile:', error)
    throw new Error('Failed to create user profile')
  }
}

// 更新用户档案
export async function updateUserProfile(userId: string, updates: {
  name?: string
  avatar_url?: string
  preferences?: any
}) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// 获取用户档案
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// 重置密码
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  
  if (error) {
    throw new Error(error.message)
  }
}

// 监听认证状态变化
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user as AuthUser || null)
  })
}
