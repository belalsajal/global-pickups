import { supabase } from '../supabase';
import mockApiService from './mockApiService';

/**
 * Global Pickups API Service
 * Handles all API interactions with the Supabase backend
 */
class ApiService {
  constructor() {
    // Check if mock API mode is enabled
    this.useMockApi = process.env.REACT_APP_USE_MOCK_API === 'true';
    
    // For development environment, log which mode we're using
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Service initialized in ${this.useMockApi ? 'MOCK' : 'REAL'} mode`);
    }
  }
  
  // ======== AUTH METHODS ========
  
  /**
   * Sign up a new user
   * @param {Object} userData - User data including email, password
   * @returns {Promise} - Promise with the signup result
   */
  async signUp({ email, password, ...metadata }) {
    if (this.useMockApi) {
      return mockApiService.signUp({ email, password, ...metadata });
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) throw error;
      
      // If signup is successful and we have a user, create a profile record
      if (data.user) {
        await this.createProfile({
          id: data.user.id,
          email,
          ...metadata
        });
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Sign in a user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Promise with the signin result
   */
  async signIn(email, password) {
    if (this.useMockApi) {
      return mockApiService.signIn(email, password);
    }
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Sign out the current user
   * @returns {Promise} - Promise with the signout result
   */
  async signOut() {
    if (this.useMockApi) {
      return mockApiService.signOut();
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  }
  
  /**
   * Get the current session
   * @returns {Promise} - Promise with the session data
   */
  async getSession() {
    if (this.useMockApi) {
      return mockApiService.getSession();
    }
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Resend verification email
   * @param {Object} options - Options containing email
   * @returns {Promise} - Promise with the result
   */
  async resendVerification({ email }) {
    if (this.useMockApi) {
      return mockApiService.resendVerification({ email });
    }
    
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email
      });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Resend verification email error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Request password reset email
   * @param {string} email - User email
   * @returns {Promise} - Promise with the result
   */
  async resetPassword(email) {
    if (this.useMockApi) {
      return mockApiService.resetPassword(email);
    }
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error };
    }
  }
  
  /**
   * Update user password
   * @param {string} newPassword - New password
   * @returns {Promise} - Promise with the result
   */
  async updatePassword(newPassword) {
    if (this.useMockApi) {
      return mockApiService.updatePassword(newPassword);
    }
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { error };
    }
  }
  
  // ======== PROFILE METHODS ========
  
  /**
   * Create a new user profile
   * @param {Object} profileData - Profile data
   * @returns {Promise} - Promise with the created profile
   */
  async createProfile(profileData) {
    if (this.useMockApi) {
      return mockApiService.createProfile(profileData);
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            ...profileData,
            updated_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Create profile error:', error);
      return { error };
    }
  }
  
  /**
   * Get user profile by ID
   * @param {string} userId - User ID
   * @returns {Promise} - Promise with the profile data
   */
  async getProfile(userId) {
    if (this.useMockApi) {
      return mockApiService.getProfile(userId);
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updates - Profile updates
   * @returns {Promise} - Promise with the update result
   */
  async updateProfile(userId, updates) {
    if (this.useMockApi) {
      return mockApiService.updateProfile(userId, updates);
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error };
    }
  }
  
  // ======== TRAVEL PLANS METHODS ========
  
  /**
   * Create a new travel plan
   * @param {Object} travelPlanData - Travel plan data
   * @returns {Promise} - Promise with the created travel plan
   */
  async createTravelPlan(travelPlanData) {
    if (this.useMockApi) {
      return mockApiService.createTravelPlan(travelPlanData);
    }
    
    try {
      const { data, error } = await supabase
        .from('travel_plans')
        .insert([travelPlanData])
        .select();
      
      if (error) throw error;
      
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Create travel plan error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get all travel plans with optional filters
   * @param {Object} filters - Optional filters for travel plans
   * @returns {Promise} - Promise with the travel plans
   */
  async getTravelPlans(filters = {}) {
    if (this.useMockApi) {
      return mockApiService.getTravelPlans(filters);
    }
    
    try {
      let query = supabase
        .from('travel_plans')
        .select('*, profiles(*)');
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          if (key === 'departure_date' || key === 'arrival_date') {
            // For dates, filter for dates after the specified date
            query = query.gte(key, filters[key]);
          } else if (key === 'departure_location' || key === 'arrival_location') {
            // For locations, use partial text search (use ilike for case-insensitive)
            query = query.ilike(key, `%${filters[key]}%`);
          } else {
            // For other fields, use exact match
            query = query.eq(key, filters[key]);
          }
        }
      });
      
      // Order by creation date, newest first
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get travel plans error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get a specific travel plan by ID
   * @param {string} travelPlanId - Travel plan ID
   * @returns {Promise} - Promise with the travel plan data
   */
  async getTravelPlanById(travelPlanId) {
    if (this.useMockApi) {
      return mockApiService.getTravelPlanById(travelPlanId);
    }
    
    try {
      const { data, error } = await supabase
        .from('travel_plans')
        .select('*, profiles(*)')
        .eq('id', travelPlanId)
        .single();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get travel plan by ID error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Update a travel plan
   * @param {string} travelPlanId - Travel plan ID
   * @param {Object} updates - Travel plan updates
   * @returns {Promise} - Promise with the update result
   */
  async updateTravelPlan(travelPlanId, updates) {
    if (this.useMockApi) {
      return mockApiService.updateTravelPlan(travelPlanId, updates);
    }
    
    try {
      const { error } = await supabase
        .from('travel_plans')
        .update(updates)
        .eq('id', travelPlanId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update travel plan error:', error);
      return { error };
    }
  }
  
  /**
   * Delete a travel plan
   * @param {string} travelPlanId - Travel plan ID
   * @returns {Promise} - Promise with the delete result
   */
  async deleteTravelPlan(travelPlanId) {
    if (this.useMockApi) {
      return mockApiService.deleteTravelPlan(travelPlanId);
    }
    
    try {
      const { error } = await supabase
        .from('travel_plans')
        .delete()
        .eq('id', travelPlanId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Delete travel plan error:', error);
      return { error };
    }
  }
  
  // ======== ITEM REQUEST METHODS ========
  
  /**
   * Create a new item request
   * @param {Object} itemRequestData - Item request data
   * @returns {Promise} - Promise with the created item request
   */
  async createItemRequest(itemRequestData) {
    if (this.useMockApi) {
      return mockApiService.createItemRequest(itemRequestData);
    }
    
    try {
      const { data, error } = await supabase
        .from('item_requests')
        .insert([itemRequestData])
        .select();
      
      if (error) throw error;
      
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Create item request error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get all item requests with optional filters
   * @param {Object} filters - Optional filters for item requests
   * @returns {Promise} - Promise with the item requests
   */
  async getItemRequests(filters = {}) {
    if (this.useMockApi) {
      return mockApiService.getItemRequests(filters);
    }
    
    try {
      let query = supabase
        .from('item_requests')
        .select('*, profiles(*)');
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          if (key === 'needed_by_date') {
            // For dates, filter for dates after the specified date
            query = query.gte(key, filters[key]);
          } else if (key === 'pickup_location' || key === 'delivery_location') {
            // For locations, use partial text search (use ilike for case-insensitive)
            query = query.ilike(key, `%${filters[key]}%`);
          } else {
            // For other fields, use exact match
            query = query.eq(key, filters[key]);
          }
        }
      });
      
      // Order by creation date, newest first
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get item requests error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get a specific item request by ID
   * @param {string} itemRequestId - Item request ID
   * @returns {Promise} - Promise with the item request data
   */
  async getItemRequestById(itemRequestId) {
    if (this.useMockApi) {
      return mockApiService.getItemRequestById(itemRequestId);
    }
    
    try {
      const { data, error } = await supabase
        .from('item_requests')
        .select('*, profiles(*)')
        .eq('id', itemRequestId)
        .single();
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get item request by ID error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Update an item request
   * @param {string} itemRequestId - Item request ID
   * @param {Object} updates - Item request updates
   * @returns {Promise} - Promise with the update result
   */
  async updateItemRequest(itemRequestId, updates) {
    if (this.useMockApi) {
      return mockApiService.updateItemRequest(itemRequestId, updates);
    }
    
    try {
      const { error } = await supabase
        .from('item_requests')
        .update(updates)
        .eq('id', itemRequestId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update item request error:', error);
      return { error };
    }
  }
  
  /**
   * Delete an item request
   * @param {string} itemRequestId - Item request ID
   * @returns {Promise} - Promise with the delete result
   */
  async deleteItemRequest(itemRequestId) {
    if (this.useMockApi) {
      return mockApiService.deleteItemRequest(itemRequestId);
    }
    
    try {
      const { error } = await supabase
        .from('item_requests')
        .delete()
        .eq('id', itemRequestId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Delete item request error:', error);
      return { error };
    }
  }
  
  // ======== MATCHING & DELIVERY METHODS ========
  
  /**
   * Create a delivery match between travel plan and item request
   * @param {Object} matchData - Match data
   * @returns {Promise} - Promise with the created match
   */
  async createDeliveryMatch(matchData) {
    if (this.useMockApi) {
      return mockApiService.createDeliveryMatch(matchData);
    }
    
    try {
      const { data, error } = await supabase
        .from('delivery_matches')
        .insert([matchData])
        .select();
      
      if (error) throw error;
      
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Create delivery match error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get all delivery matches for a user
   * @param {string} userId - User ID
   * @param {string} role - User role (traveler or requester)
   * @returns {Promise} - Promise with the delivery matches
   */
  async getDeliveryMatches(userId, role) {
    if (this.useMockApi) {
      return mockApiService.getDeliveryMatches(userId, role);
    }
    
    try {
      let query = supabase
        .from('delivery_matches')
        .select(`
          *,
          travel_plans(*),
          item_requests(*),
          traveler:profiles!traveler_id(*),
          requester:profiles!requester_id(*)
        `);
      
      // Filter by user and role
      if (role === 'traveler') {
        query = query.eq('traveler_id', userId);
      } else if (role === 'requester') {
        query = query.eq('requester_id', userId);
      }
      
      // Order by creation date, newest first
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get delivery matches error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Update delivery match status
   * @param {string} matchId - Match ID
   * @param {string} status - New status
   * @returns {Promise} - Promise with the update result
   */
  async updateDeliveryMatchStatus(matchId, status) {
    if (this.useMockApi) {
      return mockApiService.updateDeliveryMatchStatus(matchId, status);
    }
    
    try {
      const { error } = await supabase
        .from('delivery_matches')
        .update({ status })
        .eq('id', matchId);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Update delivery match status error:', error);
      return { error };
    }
  }
  
  // ======== MESSAGING METHODS ========
  
  /**
   * Get or create a conversation between two users
   * @param {string} user1Id - First user ID
   * @param {string} user2Id - Second user ID
   * @returns {Promise} - Promise with the conversation
   */
  async getOrCreateConversation(user1Id, user2Id) {
    if (this.useMockApi) {
      // This is a convenience method not in the mock API, so we implement it here
      try {
        const { data: existingConv } = await mockApiService.getConversations(user1Id);
        const conversation = existingConv.find(
          conv => (conv.user1_id === user1Id && conv.user2_id === user2Id) || 
                  (conv.user1_id === user2Id && conv.user2_id === user1Id)
        );
        
        if (conversation) {
          return { data: conversation, error: null };
        } else {
          return mockApiService.createConversation({
            user1_id: user1Id,
            user2_id: user2Id
          });
        }
      } catch (error) {
        console.error('Get or create conversation error:', error);
        return { data: null, error };
      }
    }
    
    try {
      // First check if a conversation already exists between these users
      const { data: existingConv, error: existingError } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user1Id},user2_id.eq.${user1Id}`)
        .or(`user1_id.eq.${user2Id},user2_id.eq.${user2Id}`);
      
      if (existingError) throw existingError;
      
      // Find a conversation that has both users
      const conversation = existingConv.find(
        conv => (conv.user1_id === user1Id && conv.user2_id === user2Id) || 
                (conv.user1_id === user2Id && conv.user2_id === user1Id)
      );
      
      if (conversation) {
        return { data: conversation, error: null };
      }
      
      // If no conversation exists, create a new one
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('conversations')
        .insert([
          {
            user1_id: user1Id,
            user2_id: user2Id,
            created_at: now,
            updated_at: now
          }
        ])
        .select();
      
      if (error) throw error;
      
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Get or create conversation error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Send a message
   * @param {Object} messageData - Message data
   * @returns {Promise} - Promise with the sent message
   */
  async sendMessage(messageData) {
    if (this.useMockApi) {
      return mockApiService.sendMessage(messageData);
    }
    
    try {
      // Send the message
      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select();
      
      if (error) throw error;
      
      // Update conversation updated_at timestamp
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', messageData.conversation_id);
      
      return { data: data[0], error: null };
    } catch (error) {
      console.error('Send message error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get conversation messages
   * @param {string} conversationId - Conversation ID
   * @returns {Promise} - Promise with the conversation messages
   */
  async getMessages(conversationId) {
    if (this.useMockApi) {
      return mockApiService.getMessages(conversationId);
    }
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*, sender:profiles!sender_id(*)')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get messages error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get all conversations for a user
   * @param {string} userId - User ID
   * @returns {Promise} - Promise with the user conversations
   */
  async getConversations(userId) {
    if (this.useMockApi) {
      return mockApiService.getConversations(userId);
    }
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          user1:profiles!user1_id(*),
          user2:profiles!user2_id(*),
          latest_message:messages(*)
        `)
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      
      // For each conversation, add only the latest message
      const conversationsWithLatestMessage = data.map(conv => {
        // Sort messages by created_at in descending order and take the first one
        const latestMessageArray = conv.latest_message || [];
        const latestMessage = latestMessageArray.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0];
        
        return {
          ...conv,
          latest_message: latestMessage
        };
      });
      
      return { data: conversationsWithLatestMessage, error: null };
    } catch (error) {
      console.error('Get conversations error:', error);
      return { data: null, error };
    }
  }
  
  // ======== STORAGE METHODS ========
  
  /**
   * Upload a file to storage
   * @param {string} bucket - Storage bucket
   * @param {string} path - Storage path
   * @param {File} file - File to upload
   * @returns {Promise} - Promise with the upload result
   */
  async uploadFile(bucket, path, file) {
    if (this.useMockApi) {
      return mockApiService.uploadFile(bucket, path, file);
    }
    
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('File upload error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Get a public URL for a file
   * @param {string} bucket - Storage bucket
   * @param {string} path - Storage path
   * @returns {string} - Public URL for the file
   */
  getPublicUrl(bucket, path) {
    if (this.useMockApi) {
      return mockApiService.getPublicUrl(bucket, path);
    }
    
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
  
  /**
   * Delete a file from storage
   * @param {string} bucket - Storage bucket
   * @param {string} path - Storage path
   * @returns {Promise} - Promise with the delete result
   */
  async deleteFile(bucket, path) {
    if (this.useMockApi) {
      return mockApiService.deleteFile(bucket, path);
    }
    
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('File delete error:', error);
      return { error };
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;