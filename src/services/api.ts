// API service for Kaha hotel registration
const API_BASE_URL = 'https://dev.kaha.com.np/main/api/v3';
const COORDINATE_API_URL = 'https://api.kaha.com.np/shapedata';

export interface BusinessRegistrationData {
  name: string;
  entityPrefix: string;
  tag: string;
  email: string;
  contact: string;
  mapAddress: {
    street: string;
    district: string;
    province: string;
    country: string;
    municipality: string;
    wardNo: string;
    generalAddress: string;
    googlePlacesData: {};
    additionalInfo: string;
  };
  address: string;
  latitude: number;
  longitude: number;
  isRegisteredPan: boolean;
  categoryId: string;
  tagLine: string;
  website: string;
  description: string;
  isPickup: boolean;
  isDelivery: boolean;
  workingDaysAndHours: {};
  avatarUrl: string;
  coverImageUrl: string;
  panVatCertificateUrl: string;
  buildingImageUrl: string;
  buildingInformation: string;
  floorNo: string;
  businessTypeIds: string[];
  gallery: string[];
  webGallery: string[];
  locatedInBusinessId: string;
  qrReservationId: string;
  documents: {
    panId: string;
    panVatCertificateUrl: string;
    lalpurja: string;
    electricityWaterImageUrl: string;
    citizenshipImageUrl: string;
  };
  confirmations: {
    otp: string;
    fullName: string;
    contactNumber: string;
  };
}

export interface OTPResponse {
  message: string;
  requiresName: boolean;
}

export interface TagAvailabilityResponse {
  isAvailableTag: boolean;
  business?: {
    id: string;
    name: string;
    email: string;
    address: string;
    tag: string;
    kahaId: string;
    avatarUrl: string;
    buildingImageUrl: string;
    coverImageUrl: string;
    gallery: string[];
    buildingInformation: string;
    contact: string;
  };
}

export interface CoordinateInfo {
  coordinates: {
    lat: number;
    lon: number;
  };
  result_count: number;
  results: Array<{
    district?: string;
    district_code?: string;
    formatted: string;
    province?: string | number;
    province_code?: string;
    municipality?: string;
    local_name?: string;
    type?: string;
    source: string;
  }>;
}

// API Functions
export const apiService = {
  // Trigger OTP for registration
  async triggerOTP(contactNumber: string): Promise<OTPResponse> {
    const response = await fetch(`${API_BASE_URL}/unifiedRegistration/otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactNumber }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to trigger OTP');
    }
    
    return response.json();
  },

  // Check if Kaha tag is available
  async checkTagAvailability(tag: string): Promise<TagAvailabilityResponse> {
    const response = await fetch(`${API_BASE_URL}/businesses/available-tag/${tag}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to check tag availability');
    }
    
    return response.json();
  },

  // Resolve address from coordinates
  async resolveAddressFromCoordinate(lat: number, lon: number): Promise<CoordinateInfo> {
    const response = await fetch(`${COORDINATE_API_URL}/get_info?lat=${lat}&lon=${lon}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to resolve address');
    }
    
    return response.json();
  },

  // Upload image (placeholder - implement based on actual upload endpoint)
  async uploadImage(file: File): Promise<string> {
    // This would be implemented based on the actual image upload endpoint
    // For now, returning a placeholder URL
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://placeholder-image-url.com/${file.name}`);
      }, 1000);
    });
  },

  // Submit business registration
  async registerBusiness(data: BusinessRegistrationData): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/businesses-from-web`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to register business');
    }
    
    return response.json();
  },
};

// Helper functions
export const helpers = {
  // Generate suggested Kaha tag from business name
  generateKahaTag(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .substring(0, 20);
  },

  // Check if suggested tag is available
  async isSuggestedTagAvailable(tag: string): Promise<boolean> {
    try {
      const result = await apiService.checkTagAvailability(tag);
      return result.isAvailableTag;
    } catch (error) {
      console.error('Error checking tag availability:', error);
      return false;
    }
  },

  // Compose dummy profile data from form data
  composeDummyProfileFromFormData(formData: any, coordinates: { lat: number; lon: number }, addressInfo: CoordinateInfo): Partial<BusinessRegistrationData> {
    const bestAddressResult = addressInfo.results.find(r => r.municipality && r.district) || addressInfo.results[0];
    
    return {
      name: formData.name,
      entityPrefix: "HOTEL",
      tag: formData.suggestedTag,
      email: formData.email || "",
      contact: formData.contactNumber,
      mapAddress: {
        street: formData.address || "",
        district: bestAddressResult?.district || "",
        province: bestAddressResult?.province?.toString() || "",
        country: "Nepal",
        municipality: bestAddressResult?.municipality || "",
        wardNo: formData.wardNo || "",
        generalAddress: bestAddressResult?.formatted || "",
        googlePlacesData: {},
        additionalInfo: formData.additionalInfo || "",
      },
      address: formData.address || bestAddressResult?.formatted || "",
      latitude: coordinates.lat,
      longitude: coordinates.lon,
      isRegisteredPan: false,
      categoryId: "hotel-category-id", // This should be the actual hotel category ID
      tagLine: formData.tagLine || "",
      website: formData.website || "",
      description: formData.description,
      isPickup: false,
      isDelivery: false,
      workingDaysAndHours: {},
      avatarUrl: formData.avatarUrl || "",
      coverImageUrl: formData.coverImageUrl || "",
      panVatCertificateUrl: "",
      buildingImageUrl: "",
      buildingInformation: formData.buildingInformation || "",
      floorNo: formData.floorNo || "",
      businessTypeIds: ["hotel-business-type-id"], // This should be actual business type IDs
      gallery: formData.gallery || [],
      webGallery: formData.webGallery || [],
      locatedInBusinessId: "",
      qrReservationId: "",
      documents: {
        panId: "",
        panVatCertificateUrl: "",
        lalpurja: "",
        electricityWaterImageUrl: "",
        citizenshipImageUrl: "",
      },
      confirmations: {
        otp: formData.otp,
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
      },
    };
  },
};