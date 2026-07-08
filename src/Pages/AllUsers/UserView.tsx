import { useNavigate } from "react-router-dom";
import {
    ArrowLeft, User, Mail, Phone, MapPin, Calendar,
    Briefcase, Heart, Globe, Star, GraduationCap,
    Dumbbell, Cigarette, Wine, Baby, DollarSign,
    Ticket, ThumbsUp, Crown, Info,
} from "lucide-react";
import Tags from "../../Components/Tags";

interface UserDetails {
    userName: string;
    dateOfBirth: string;
    contactNumber: string;
    email: string;
    location: string;
    approved: boolean;
    selfieImage: string;
    userLikeCount: number;
    totalTicketPurchase: number;
    userMode: string;
    bio: string;
    gender: string;
    age: string;
    languages: string;
    interest: string;
    religion: string;
    work: string;
    height: string;
    education: string;
    exercise: string;
    starSign: string;
    educationLevel: string;
    marriedStatus: string;
    annualIncome: string;
    companyName: string;
    dietPlan: string;
    smoking: string;
    drinking: string;
    haveChildren: string;
    moreChildren: string;
    relationStatus: string;
    city: string;
    state: string;
    country: string;
    wantDate: string;
}

const user: UserDetails = {
    userName: "John Doe",
    dateOfBirth: "18 May 1998",
    contactNumber: "+44 7884169444",
    email: "john.doe@gmail.com",
    location: "London",
    approved: false,
    selfieImage: "",
    userLikeCount: 0,
    totalTicketPurchase: 0,
    userMode: "Free User",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    gender: "Male",
    age: "27",
    languages: "English",
    interest: "Travel",
    religion: "Christian",
    work: "Software Engineer",
    height: "178 cm",
    education: "B.Tech",
    exercise: "Gym",
    starSign: "Leo",
    educationLevel: "Graduate",
    marriedStatus: "Single",
    annualIncome: "$50,000",
    companyName: "Google",
    dietPlan: "Vegetarian",
    smoking: "No",
    drinking: "Occasionally",
    haveChildren: "No",
    moreChildren: "No",
    relationStatus: "Single",
    city: "London",
    state: "England",
    country: "United Kingdom",
    wantDate: "Friendship",
};

interface FieldProps {
    icon?: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

function Field({ icon, label, value }: FieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            <div className="flex items-center gap-2 min-h-[36px]">
                {icon && <span className="text-gray-400 shrink-0">{icon}</span>}
                <span className="text-[14px] text-[#111827] font-medium">{value || "—"}</span>
            </div>
        </div>
    );
}

interface SectionProps {
    title: string;
    accent: string;
    iconBg: string;
    sectionIcon: React.ReactNode;
    children: React.ReactNode;
}

function Section({ title, accent, iconBg, sectionIcon, children }: SectionProps) {
    return (
        <div className={`bg-white rounded-[14px] border border-gray-200 shadow-sm overflow-hidden`}>
            <div className={`flex items-center gap-3 px-6 py-4 border-b border-gray-100 border-l-4 ${accent}`}>
                <div className={`w-8 h-8 rounded-[8px] ${iconBg} flex items-center justify-center shrink-0`}>
                    {sectionIcon}
                </div>
                <h3 className="text-[15px] font-semibold text-[#101828]">{title}</h3>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                {children}
            </div>
        </div>
    );
}

export default function UserView() {
    const navigate = useNavigate();

    const initials = user.userName.split(" ").map(n => n[0]).join("").toUpperCase();

    return (
        <div className="w-full min-h-screen bg-gray-50 text-[#111827]">
            <div className="px-4 sm:px-8 pt-6 pb-16 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#101828]">User Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="text-[#2563EB] cursor-pointer hover:underline" onClick={() => navigate("/all-users")}>
                                All Users
                            </span>
                            <span className="mx-1.5 text-gray-300">/</span>
                            <span>View User</span>
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/all-users")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to List
                    </button>
                </div>

                {/* Profile Hero Card */}
                <div className="bg-white rounded-[14px] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Left accent panel */}
                        <div className="relative md:w-56 bg-gradient-to-b from-blue-50 via-indigo-60 to-blue-300 flex flex-col items-center justify-center py-10 px-6 shrink-0 overflow-hidden border-r border-blue-200">
                            {/* Subtle circle decorations inside panel */}
                            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-blue-200/30" />
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-200/25" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-blue-100/40" />

                            {/* Avatar */}
                            <div className="relative z-10 w-20 h-20 rounded-full ring-4 ring-white bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
                                {user.selfieImage
                                    ? <img src={user.selfieImage} alt={user.userName} className="w-full h-full object-cover rounded-full" />
                                    : initials
                                }
                            </div>

                            <h2 className="relative z-10 mt-3 text-[16px] font-bold text-[#1e3a5f] text-center leading-tight">{user.userName}</h2>
                            <p className="relative z-10 mt-1 text-[11.5px] text-blue-600 text-center break-all">{user.email}</p>

                            {/* Badges */}
                            <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-1.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                    user.approved
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                        : "bg-red-50 text-red-500 border-red-200"
                                }`}>
                                    {user.approved ? "✓ Verified" : "✗ Not Verified"}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                                    {user.userMode}
                                </span>
                            </div>
                        </div>

                        {/* Right content */}
                        <div className="flex-1 p-6 flex flex-col justify-between gap-5">

                            {/* Top row: name + gender + contact */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-[22px] font-bold text-[#101828]">{user.userName}</h2>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <Tags text={user.gender} variant="gray" />
                                        <Tags text={`${user.age} yrs`} variant="blue" />
                                        <Tags text={user.relationStatus} variant="purple" />
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[13px] text-gray-400">{user.contactNumber}</p>
                                    <p className="text-[13px] text-gray-400 mt-0.5">{user.city}, {user.country}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            {user.bio && (
                                <p className="text-[13.5px] text-gray-500 leading-relaxed border-l-2 border-blue-200 pl-3 italic">
                                    "{user.bio}"
                                </p>
                            )}

                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                                {[
                                    { icon: <ThumbsUp size={15} className="text-pink-500" />, bg: "bg-pink-50", label: "Likes", value: user.userLikeCount },
                                    { icon: <Ticket size={15} className="text-blue-500" />, bg: "bg-blue-50", label: "Tickets", value: user.totalTicketPurchase },
                                    { icon: <Crown size={15} className="text-amber-500" />, bg: "bg-amber-50", label: "Plan", value: user.userMode },
                                    { icon: <MapPin size={15} className="text-emerald-500" />, bg: "bg-emerald-50", label: "Location", value: `${user.city}, ${user.country}` },
                                ].map(stat => (
                                    <div key={stat.label} className="flex items-center gap-2.5 bg-gray-50 rounded-[10px] px-3 py-2.5">
                                        <div className={`w-8 h-8 rounded-[8px] ${stat.bg} flex items-center justify-center shrink-0`}>
                                            {stat.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{stat.label}</p>
                                            <p className="text-[13px] font-bold text-[#111827] truncate">{stat.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section: Basic Info */}
                <Section
                    title="Basic Information"
                    accent="border-l-blue-500"
                    iconBg="bg-blue-50"
                    sectionIcon={<User size={16} className="text-blue-600" />}
                >
                    <Field icon={<User size={15} />} label="Username" value={user.userName} />
                    <Field icon={<Mail size={15} />} label="Email Address" value={user.email} />
                    <Field icon={<Phone size={15} />} label="Contact Number" value={user.contactNumber} />
                    <Field icon={<Calendar size={15} />} label="Date of Birth" value={user.dateOfBirth} />
                    <Field icon={<Info size={15} />} label="Age" value={`${user.age} years`} />
                    <Field icon={<User size={15} />} label="Gender" value={user.gender} />
                </Section>

                {/* Section: Location */}
                <Section
                    title="Location"
                    accent="border-l-emerald-500"
                    iconBg="bg-l-emerald-50"
                    sectionIcon={<MapPin size={16} className="text-emerald-600" />}
                >
                    <Field icon={<MapPin size={15} />} label="City" value={user.city} />
                    <Field icon={<MapPin size={15} />} label="State" value={user.state} />
                    <Field icon={<Globe size={15} />} label="Country" value={user.country} />
                    <Field icon={<MapPin size={15} />} label="Location" value={user.location} />
                </Section>

                {/* Section: Professional */}
                <Section
                    title="Professional Details"
                    accent="border-l-purple-500"
                    iconBg="bg-purple-50"
                    sectionIcon={<Briefcase size={16} className="text-purple-600" />}
                >
                    <Field icon={<Briefcase size={15} />} label="Work" value={user.work} />
                    <Field icon={<Briefcase size={15} />} label="Company" value={user.companyName} />
                    <Field icon={<GraduationCap size={15} />} label="Education" value={user.education} />
                    <Field icon={<GraduationCap size={15} />} label="Education Level" value={user.educationLevel} />
                    <Field icon={<DollarSign size={15} />} label="Annual Income" value={user.annualIncome} />
                    <Field icon={<Globe size={15} />} label="Languages" value={user.languages} />
                </Section>

                {/* Section: Lifestyle */}
                <Section
                    title="Lifestyle & Preferences"
                    accent="border-l-rose-500"
                    iconBg="bg-rose-50"
                    sectionIcon={<Heart size={16} className="text-rose-600" />}
                >
                    <Field icon={<Heart size={15} />} label="Interest" value={user.interest} />
                    <Field icon={<Heart size={15} />} label="Religion" value={user.religion} />
                    <Field icon={<Star size={15} />} label="Star Sign" value={user.starSign} />
                    <Field icon={<Dumbbell size={15} />} label="Exercise" value={user.exercise} />
                    <Field icon={<Info size={15} />} label="Diet Plan" value={user.dietPlan} />
                    <Field icon={<Info size={15} />} label="Height" value={user.height} />
                    <Field icon={<Cigarette size={15} />} label="Smoking" value={user.smoking} />
                    <Field icon={<Wine size={15} />} label="Drinking" value={user.drinking} />
                </Section>

                {/* Section: Relationship */}
                <Section
                    title="Relationship & Family"
                    accent="border-l-amber-500"
                    iconBg="bg-amber-50"
                    sectionIcon={<Heart size={16} className="text-amber-600" />}
                >
                    <Field icon={<Heart size={15} />} label="Relation Status" value={user.relationStatus} />
                    <Field icon={<Heart size={15} />} label="Married Status" value={user.marriedStatus} />
                    <Field icon={<Baby size={15} />} label="Have Children" value={user.haveChildren} />
                    <Field icon={<Baby size={15} />} label="Want More Children" value={user.moreChildren} />
                    <Field icon={<Heart size={15} />} label="Looking For" value={user.wantDate} />
                </Section>

            </div>
        </div>
    );
}
