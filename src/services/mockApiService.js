import { v4 as uuidv4 } from 'uuid';

/**
 * Mock API Service for Global Pickups Application
 * Used for development and testing without using actual Supabase backend
 */
class MockApiService {
  constructor() {
    // Initialize mock data stores
    this.users = [];
    this.profiles = [];
    this.travelPlans = [];
    this.itemRequests = [];
    this.deliveryMatches = [];
    this.conversations = [];
    this.messages = [];
    
    // Mock session
    this.currentSession = null;
    
    // Add some sample data
    this._initializeMockData();
  }
  
  // Initialize with sample data
  _initializeMockData() {
    // Create sample users
    const user1 = {
      id: 'user-1',
      email: 'traveler@example.com',
      password: 'password123',
      created_at: new Date().toISOString()
    };
    
    const user2 = {
      id: 'user-2',
      email: 'requester@example.com',
      password: 'password123',
      created_at: new Date().toISOString()
    };
    
    this.users.push(user1, user2);
    
    // Create sample profiles
    const profile1 = {
      id: 'user-1',
      email: 'traveler@example.com',
      first_name: 'John',
      last_name: 'Traveler',
      phone: '+1234567890',
      avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
      created_at: new Date().toISOString()
    };
    
    const profile2 = {
      id: 'user-2',
      email: 'requester@example.com',
      first_name: 'Jane',
      last_name: 'Requester',
      phone: '+0987654321',
      avatar_url: 'https://randomuser.me/api/portraits/women/1.jpg',
      created_at: new Date().toISOString()
    };
    
    this.profiles.push(profile1, profile2);
    
    // Create sample travel plans
    const travelPlan1 = {
      id: 'travel-1',
      user_id: 'user-1',
      departure_location: 'New York, USA',
      arrival_location: 'London, UK',
      departure_date: '2025-05-15T00:00:00Z',
      arrival_date: '2025-05-16T00:00:00Z',
      available_weight_kg: 5,
      notes: 'Direct flight, can carry small items',
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    const travelPlan2 = {
      id: 'travel-2',
      user_id: 'user-1',
      departure_location: 'London, UK',
      arrival_location: 'Paris, France',
      departure_date: '2025-06-10T00:00:00Z',
      arrival_date: '2025-06-10T00:00:00Z',
      available_weight_kg: 3,
      notes: 'Taking the Eurostar train',
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    this.travelPlans.push(travelPlan1, travelPlan2);
    
    // Create sample item requests
    const itemRequest1 = {
      id: 'request-1',
      user_id: 'user-2',
      item_name: 'Laptop charger',
      item_description: 'MacBook Pro charger, 96W USB-C',
      pickup_location: 'New York, USA',
      delivery_location: 'London, UK',
      weight_kg: 0.5,
      needed_by_date: '2025-05-20T00:00:00Z',
      compensation_offered: 20,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    const itemRequest2 = {
      id: 'request-2',
      user_id: 'user-2',
      item_name: 'Gift box',
      item_description: 'Small gift box with chocolates',
      pickup_location: 'London, UK',
      delivery_location: 'Paris, France',
      weight_kg: 1,
      needed_by_date: '2025-06-15T00:00:00Z',
      compensation_offered: 15,
      status: 'active',
      created_at: new Date().toISOString()
    };
    
    this.itemRequests.push(itemRequest1, itemRequest2);
    
    // Create sample delivery match
    const match1 = {
      id: 'match-1',
      travel_plan_id: 'travel-1',
      item_request_id: 'request-1',
      traveler_id: 'user-1',
      requester_id: 'user-2',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    this.deliveryMatches.push(match1);
    
    // Create sample conversation
    const conversation1 = {
      id: 'conv-1',
      user1_id: 'user-1',
      user2_id: 'user-2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    this.conversations.push(conversation1);
    
    // Create sample messages
    const message1 = {
      id: 'msg-1',
      conversation_id: 'conv-1',
      sender_id: 'user-1',
      content: 'Hi, I saw your request for a laptop charger.',
      created_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    };
    
    const message2 = {
      id: 'msg-2',
      conversation_id: 'conv-1',
      sender_id: 'user-2',
      content: 'Hello! Yes, I need it delivered to London by May 20th.',
      created_at: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
    };
    
    this.messages.push(message1, message2);
  }
  
  // Helper to simulate network delay
  _delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Helper to find an object by ID in a collection
  _findById(collection, id) {
    return collection.find(item => item.id === id);
  }
  
  // Helper to add created_at and id to a new record
  _addMetadata(object) {
    return {
      ...object,
      id: object.id || uuidv4(),
      created_at: object.created_at || new Date().toISOString()
    };
  }
  
  // ======== AUTH METHODS ========
  
  /**
   * Sign up a new user
   * @param {Object} userData - User data including email, password, and profile info
   * @returns {Promise} - Promise with the signup result
   */
  async signUp(userData) {
    await this._delay();
    
    try {
      const { email, password, ...profileData } = userData;
      
      // Check if user with email already exists
      const existingUser = this.users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = this._addMetadata({
        email,
        password, // In a real application, this would be hashed
        ...profileData
      });
      
      this.users.push(newUser);
      
      // Create user profile
      await this.createProfile({
        id: newUser.id,
        email,
        ...profileData
      });
      
      this.currentSession = {
        user: { ...newUser, password: undefined }, // Don't return password
        expires_at: new Date(Date.now() + 3600000).toISOString()
      };
      
      return { 
        data: { user: this.currentSession.user, session: this.currentSession },
        error: null 
      };
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
    await this._delay();
    
    try {
      // Find user with matching email and password
      const user = this.users.find(
        user => user.email === email && user.password === password
      );
      
      if (!user) {
        throw new Error('Invalid login credentials');
      }
      
      this.currentSession = {
        user: { ...user, password: undefined }, // Don't return password
        expires_at: new Date(Date.now() + 3600000).toISOString()
      };
      
      return { 
        data: { user: this.currentSession.user, session: this.currentSession },
        error: null 
      };
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
    await this._delay();
    
    try {
      this.currentSession = null;
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
    await this._delay();
    
    try {
      return { 
        data: { session: this.currentSession },
        error: null 
      };
    } catch (error) {
      console.error('Get session error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Resend verification email
   * @param {Object} options - Object containing email address
   * @returns {Promise} - Promise with the result
   */
  async resendVerification({ email }) {
    await this._delay();
    
    try {
      // In mock implementation, just check if user exists
      const user = this.users.find(user => user.email === email);
      if (!user) {
        throw new Error('No user found with this email');
      }
      
      console.log('Mock API: Resending verification email to', email);
      
      return { 
        data: { message: "Verification email resent successfully" },
        error: null 
      };
    } catch (error) {

      console.error('Resend verification error:', error);
      return { data: null, error };
    }
  }
  
  /**
   * Request password reset email
   * @param {string} email - User email
   * @returns {Promise} - Promise with the result
   */
  async resetPassword(email) {
    await this._delay();
    
    try {
      // In mock implementation, just check if user exists
      const user = this.users.find(user => user.email === email);
      if (!user) {
        throw new Error('No user found with this email');
      }
      
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
    await this._delay();
    
    try {
      if (!this.currentSession?.user?.id) {
        throw new Error('No authenticated user');
      }
      
      // Find and update user password
      const user = this._findById(this.users, this.currentSession.user.id);
      if (!user) {
        throw new Error('User not found');
      }
      
      user.password = newPassword;
      
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
    await this._delay();
    
    try {
      const newProfile = this._addMetadata(profileData);
      this.profiles.push(newProfile);
      
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
    await this._delay();
    
    try {
      const profile = this._findById(this.profiles, userId);
      
      if (!profile) {
        throw new Error('Profile not found');
      }
      
      return { data: profile, error: null };
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
    await this._delay();
    
    try {
      const profile = this._findById(this.profiles, userId);
      
      if (!profile) {
        throw new Error('Profile not found');
      }
      
      // Update profile fields
      Object.assign(profile, updates);
      
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
    await this._delay();
    
    try {
      const newTravelPlan = this._addMetadata(travelPlanData);
      this.travelPlans.push(newTravelPlan);
      
      return { data: newTravelPlan, error: null };
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
    await this._delay();
    
    try {
      // Start with all travel plans
      let filteredTravelPlans = [...this.travelPlans];
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          if (key === 'departure_date' || key === 'arrival_date') {
            // Filter dates after given date
            filteredTravelPlans = filteredTravelPlans.filter(
              plan => new Date(plan[key]) >= new Date(filters[key])
            );
          } else if (key === 'departure_location' || key === 'arrival_location') {
            // Case-insensitive partial string match
            const lowercaseFilter = filters[key].toLowerCase();
            filteredTravelPlans = filteredTravelPlans.filter(
              plan => plan[key].toLowerCase().includes(lowercaseFilter)
            );
          } else {
            // Exact match for other fields
            filteredTravelPlans = filteredTravelPlans.filter(
              plan => plan[key] === filters[key]
            );
          }
        }
      });
      
      // Sort by created_at in descending order (newest first)
      filteredTravelPlans.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      // Attach user profile info
      const travelPlansWithProfiles = filteredTravelPlans.map(plan => {
        const profile = this._findById(this.profiles, plan.user_id);
        return {
          ...plan,
          profiles: profile
        };
      });
      
      return { data: travelPlansWithProfiles, error: null };
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
    await this._delay();
    
    try {
      const travelPlan = this._findById(this.travelPlans, travelPlanId);
      
      if (!travelPlan) {
        throw new Error('Travel plan not found');
      }
      
      // Attach user profile info
      const profile = this._findById(this.profiles, travelPlan.user_id);
      const travelPlanWithProfile = {
        ...travelPlan,
        profiles: profile
      };
      
      return { data: travelPlanWithProfile, error: null };
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
    await this._delay();
    
    try {
      const travelPlan = this._findById(this.travelPlans, travelPlanId);
      
      if (!travelPlan) {
        throw new Error('Travel plan not found');
      }
      
      // Update travel plan fields
      Object.assign(travelPlan, updates);
      
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
    await this._delay();
    
    try {
      const index = this.travelPlans.findIndex(plan => plan.id === travelPlanId);
      
      if (index === -1) {
        throw new Error('Travel plan not found');
      }
      
      // Remove travel plan
      this.travelPlans.splice(index, 1);
      
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
    await this._delay();
    
    try {
      const newItemRequest = this._addMetadata(itemRequestData);
      this.itemRequests.push(newItemRequest);
      
      return { data: newItemRequest, error: null };
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
    await this._delay();
    
    try {
      // Start with all item requests
      let filteredItemRequests = [...this.itemRequests];
      
      // Apply filters
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          if (key === 'needed_by_date') {
            // Filter dates after given date
            filteredItemRequests = filteredItemRequests.filter(
              request => new Date(request[key]) >= new Date(filters[key])
            );
          } else if (key === 'pickup_location' || key === 'delivery_location') {
            // Case-insensitive partial string match
            const lowercaseFilter = filters[key].toLowerCase();
            filteredItemRequests = filteredItemRequests.filter(
              request => request[key].toLowerCase().includes(lowercaseFilter)
            );
          } else {
            // Exact match for other fields
            filteredItemRequests = filteredItemRequests.filter(
              request => request[key] === filters[key]
            );
          }
        }
      });
      
      // Sort by created_at in descending order (newest first)
      filteredItemRequests.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      // Attach user profile info
      const itemRequestsWithProfiles = filteredItemRequests.map(request => {
        const profile = this._findById(this.profiles, request.user_id);
        return {
          ...request,
          profiles: profile
        };
      });
      
      return { data: itemRequestsWithProfiles, error: null };
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
    await this._delay();
    
    try {
      const itemRequest = this._findById(this.itemRequests, itemRequestId);
      
      if (!itemRequest) {
        throw new Error('Item request not found');
      }
      
      // Attach user profile info
      const profile = this._findById(this.profiles, itemRequest.user_id);
      const itemRequestWithProfile = {
        ...itemRequest,
        profiles: profile
      };
      
      return { data: itemRequestWithProfile, error: null };
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
    await this._delay();
    
    try {
      const itemRequest = this._findById(this.itemRequests, itemRequestId);
      
      if (!itemRequest) {
        throw new Error('Item request not found');
      }
      
      // Update item request fields
      Object.assign(itemRequest, updates);
      
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
    await this._delay();
    
    try {
      const index = this.itemRequests.findIndex(request => request.id === itemRequestId);
      
      if (index === -1) {
        throw new Error('Item request not found');
      }
      
      // Remove item request
      this.itemRequests.splice(index, 1);
      
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
    await this._delay();
    
    try {
      const newMatch = this._addMetadata(matchData);
      this.deliveryMatches.push(newMatch);
      
      return { data: newMatch, error: null };
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
    await this._delay();
    
    try {
      // Filter matches by user and role
      let filteredMatches = [...this.deliveryMatches];
      
      if (role === 'traveler') {
        filteredMatches = filteredMatches.filter(match => match.traveler_id === userId);
      } else if (role === 'requester') {
        filteredMatches = filteredMatches.filter(match => match.requester_id === userId);
      }
      
      // Sort by created_at in descending order (newest first)
      filteredMatches.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );
      
      // Attach related data
      const matchesWithDetails = filteredMatches.map(match => {
        const travelPlan = this._findById(this.travelPlans, match.travel_plan_id);
        const itemRequest = this._findById(this.itemRequests, match.item_request_id);
        const traveler = this._findById(this.profiles, match.traveler_id);
        const requester = this._findById(this.profiles, match.requester_id);
        
        return {
          ...match,
          travel_plans: travelPlan,
          item_requests: itemRequest,
          traveler,
          requester
        };
      });
      
      return { data: matchesWithDetails, error: null };
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
    await this._delay();
    
    try {
      const match = this._findById(this.deliveryMatches, matchId);
      
      if (!match) {
        throw new Error('Delivery match not found');
      }
      
      // Update match status
      match.status = status;
      
      return { error: null };
    } catch (error) {
      console.error('Update delivery match status error:', error);
      return { error };
    }
  }
  
  // ======== MESSAGING METHODS ========
  
  /**
   * Send a message
   * @param {Object} messageData - Message data
   * @returns {Promise} - Promise with the sent message
   */
  async sendMessage(messageData) {
    await this._delay();
    
    try {
      const newMessage = this._addMetadata(messageData);
      this.messages.push(newMessage);
      
      // Update conversation updated_at timestamp
      const conversation = this._findById(this.conversations, messageData.conversation_id);
      if (conversation) {
        conversation.updated_at = new Date().toISOString();
      }
      
      return { data: newMessage, error: null };
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
    await this._delay();
    
    try {
      // Get all messages for the conversation
      const conversationMessages = this.messages
        .filter(message => message.conversation_id === conversationId)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      
      // Attach sender info
      const messagesWithSender = conversationMessages.map(message => {
        const sender = this._findById(this.profiles, message.sender_id);
        return {
          ...message,
          sender
        };
      });
      
      return { data: messagesWithSender, error: null };
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
    await this._delay();
    
    try {
      // Find all conversations for the user
      const userConversations = this.conversations
        .filter(conv => conv.user1_id === userId || conv.user2_id === userId)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      
      // Attach user info and latest message
      const conversationsWithDetails = userConversations.map(conversation => {
        const user1 = this._findById(this.profiles, conversation.user1_id);
        const user2 = this._findById(this.profiles, conversation.user2_id);
        
        // Get latest message
        const latestMessage = this.messages
          .filter(msg => msg.conversation_id === conversation.id)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        
        return {
          ...conversation,
          user1,
          user2,
          latest_message: latestMessage
        };
      });
      
      return { data: conversationsWithDetails, error: null };
    } catch (error) {
      console.error('Get conversations error:', error);
      return { data: null, error };
    }
  }
  
  // ======== STORAGE METHODS ========
  
  /**
   * Upload a file to storage (mock implementation)
   * @param {string} bucket - Storage bucket
   * @param {string} path - Storage path
   * @param {File} file - File to upload
   * @returns {Promise} - Promise with the upload result
   */
  async uploadFile(bucket, path, file) {
    await this._delay();
    
    try {
      // Mock successful upload
      return { 
        data: { path },
        error: null
      };
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
    // Return a fake URL for mock implementation
    return `https://mockcdn.example.com/${bucket}/${path}`;
  }
  
  /**
   * Delete a file from storage
   * @param {string} bucket - Storage bucket
   * @param {string} path - Storage path
   * @returns {Promise} - Promise with the delete result
   */
  async deleteFile(bucket, path) {
    await this._delay();
    
    try {
      // Mock successful deletion
      return { error: null };
    } catch (error) {
      console.error('File delete error:', error);
      return { error };
    }
  }
}

// Create and export a singleton instance
const mockApiService = new MockApiService();
export default mockApiService;

// Add missing function exports referenced in other files
export const submitTravelPlan = async (travelPlanData) => {
  return mockApiService.createTravelPlan(travelPlanData);
};

export const submitItemRequest = async (itemRequestData) => {
  return mockApiService.createItemRequest(itemRequestData);
};

export const getMockServerStatus = async () => {
  // Simulate a server status check
  await mockApiService._delay();
  return {
    status: "ok",
    version: "1.0.0",
    message: "Mock server is running",
    timestamp: new Date().toISOString()
  };
};
