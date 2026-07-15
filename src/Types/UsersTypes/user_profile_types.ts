export interface UserProfilePayload {
    user_id: number;
}

export interface UserInterest {
    id: string;
    name: string;
    image: string;
    description: string;
    is_selected: string;
}

export interface UserAbout {
    name: string;
    image: string;
}

export interface UserProfileData {
    id: string;
    name: string;
    email: string;
    email_verified_at: string;
    username: string;
    dob: string;
    login_type: string;
    instagram_id: string;
    sociallogin_id: string;
    facebook_id: string;

    profile_pic: string;

    phone: string;

    user_plan: string;

    bio: string;

    age: string;

    gender: string;

    country_code: string;

    otp: string;

    status: string;

    pi_1: string;
    pi_2: string;
    pi_3: string;
    pi_4: string;
    pi_5: string;
    pi_6: string;
    pi_7: string;
    pi_8: string;

    address: string;

    languages: string[];

    interest: UserInterest[];

    lookinfor: string;

    religion: string;

    location: string;

    latitude: string;

    longitude: string;

    work: string;

    device_token: string;

    login_status: string;

    education: string;

    height: string;

    exercise: string;

    star_sign: string;

    education_leval: string;

    married_status: string;

    annual_income: string;

    company_name: string;

    diet_plan: string;

    smoking: string;

    drinking: string;

    have_children: string;

    more_children: string;

    relation_status: string;

    selfie: string;

    city: string;

    state: string;

    country: string;

    country_flag: string;

    approved: number;

    plan_name: string;

    unread_count: number;

    want_date: string[];

    image_filed: string;

    subscriber_user: string;

    persontage: string;

    price: string;

    subsciber_plan_name: string;

    subsciber_status: string;

    plan_purchase_date: string;

    renewal_date: string;

    payment_method: string;

    auto_renewal: string;

    currency: string;
}

export interface UserProfileResponse {
    status: string;
    data: UserProfileData;
    about: UserAbout[];
    subscription_details: SubscriptionDetails | null;
}

export interface SubscriptionDetails {
    payment_method: string;
    reference_num: string;
    expire_date: string;
    start_date: string;
}

export interface UserProfileState {
    loading: boolean;
    error: string | null;
    user: UserProfileData | null;
    about: UserAbout[];
    subscription_details: SubscriptionDetails | null;
}