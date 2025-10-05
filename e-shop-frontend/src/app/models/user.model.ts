export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface UpdateProfileRequest {
  name: string;
  phoneNumber: string;
  address: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
