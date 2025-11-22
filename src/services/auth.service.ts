// This should later on be implemented to get the auth data from the token etc.
// For the demo we just mock a random user id

class AuthService {

    getCurrentUserId(): string {
        return '1'
    }
}

export const authService = new AuthService();