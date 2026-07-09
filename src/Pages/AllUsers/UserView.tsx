import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ArrowLeft, User, Mail, Phone, MapPin, Calendar,
    Briefcase, Heart, Globe, Star, GraduationCap,
    Dumbbell, Cigarette, Wine, Baby, DollarSign,
    Ticket, ThumbsUp, Crown, Info,
} from "lucide-react";
import Tags from "../../Components/Tags";
import type {
    AppDispatch,
    RootState,
} from "../../Store/store";

import { user_profile } from "../../Store/slices/UsersSlice/user_profile_thunk";


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
                <span className="text-[14px] text-[#111827] font-medium">
                    {value ?? "N/A"}
                </span>
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
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams();

    const {
        user,
        about,
        loading,
    } = useSelector(
        (state: RootState) => state.user_profile
    );
    const initials =
        user?.name
            ?.split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase() || "N/A";
    const formatDate = (
        date?: string
    ) => {

        if (!date) return "N/A";

        return new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };
    const selectedInterests =
        user?.interest
            ?.filter(
                (item) =>
                    item.is_selected === "1"
            )
            .map(
                (item) => item.name
            )
            .join(", ") || "N/A";
    const languages =
        user?.languages?.length
            ? user.languages.join(", ")
            : "N/A";
    const wantDate =
        user?.want_date?.length
            ? user.want_date.join(", ")
            : "N/A";
    const haveChildren =
        user?.have_children === "1"
            ? "Yes"
            : user?.have_children === "0"
                ? "No"
                : "N/A";
    void about;
    useEffect(() => {

        if (!id) return;

        dispatch(
            user_profile({
                user_id: Number(id),
            })
        );

    }, [dispatch, id]);
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-8 pt-6 pb-16 animate-pulse">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <div className="h-8 w-52 rounded bg-gray-200 mb-3" />
                        <div className="h-4 w-40 rounded bg-gray-100" />
                    </div>

                    <div className="h-11 w-36 rounded-lg bg-gray-200" />
                </div>

                {/* Hero Card */}
                <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
                    <div className="flex gap-8">

                        <div className="flex flex-col items-center w-56">

                            <div className="w-24 h-24 rounded-full bg-gray-200" />

                            <div className="h-5 w-32 rounded bg-gray-200 mt-5" />

                            <div className="h-4 w-40 rounded bg-gray-100 mt-3" />

                            <div className="flex gap-2 mt-5">
                                <div className="h-6 w-24 rounded-full bg-gray-200" />
                                <div className="h-6 w-24 rounded-full bg-gray-200" />
                            </div>

                        </div>

                        <div className="flex-1">

                            <div className="h-8 w-56 rounded bg-gray-200 mb-5" />

                            <div className="flex gap-3 mb-5">

                                <div className="h-6 w-20 rounded-full bg-gray-200" />

                                <div className="h-6 w-20 rounded-full bg-gray-200" />

                                <div className="h-6 w-24 rounded-full bg-gray-200" />

                            </div>

                            <div className="h-4 w-full rounded bg-gray-100 mb-2" />

                            <div className="h-4 w-5/6 rounded bg-gray-100 mb-8" />

                            <div className="grid grid-cols-4 gap-4">

                                {[...Array(4)].map((_, index) => (

                                    <div
                                        key={index}
                                        className="h-20 rounded-xl bg-gray-100"
                                    />

                                ))}

                            </div>

                        </div>

                    </div>
                </div>

                {/* Sections */}

                {[...Array(5)].map((_, section) => (

                    <div
                        key={section}
                        className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
                    >

                        <div className="h-6 w-52 rounded bg-gray-200 mb-8" />

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {[...Array(6)].map((_, item) => (

                                <div key={item}>

                                    <div className="h-3 w-20 rounded bg-gray-100 mb-3" />

                                    <div className="h-5 w-40 rounded bg-gray-200" />

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>
        );
    }
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
                                {user?.profile_pic ? (
                                    <img
                                        src={user.profile_pic}
                                        alt={user.name || "User"}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    initials
                                )}
                            </div>

                            <h2 className="relative z-10 mt-3 text-[16px] font-bold text-[#1e3a5f] text-center leading-tight">{user?.name || "N/A"}</h2>
                            <p className="relative z-10 mt-1 text-[11.5px] text-blue-600 text-center break-all">{user?.email || "N/A"}</p>

                            {/* Badges */}
                            <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-1.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${user?.approved === 1
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-red-50 text-red-500 border-red-200"
                                    }`}>
                                    {user?.approved === 1
                                        ? "✓ Verified"
                                        : "✗ Not Verified"}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-600 border border-blue-200">
                                    {user?.plan_name || "Free User"}
                                </span>
                            </div>
                        </div>

                        {/* Right content */}
                        <div className="flex-1 p-6 flex flex-col justify-between gap-5">

                            {/* Top row: name + gender + contact */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-[22px] font-bold text-[#101828]">{user?.name || "N/A"}</h2>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <Tags
                                            text={user?.gender || "N/A"}
                                            variant="gray"
                                        />
                                        <Tags
                                            text={
                                                user?.age
                                                    ? `${user.age} yrs`
                                                    : "N/A"
                                            }
                                            variant="blue"
                                        />
                                        <Tags
                                            text={user?.relation_status || "N/A"}
                                            variant="purple"
                                        />
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[13px] text-gray-400">{user?.phone || "N/A"}</p>
                                    <p className="text-[13px] text-gray-400 mt-0.5">{user?.city || "N/A"}, {user?.country || "N/A"}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-[13.5px] text-gray-500 leading-relaxed border-l-2 border-blue-200 pl-3 italic">
                                {user?.bio || "N/A"}
                            </p>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-gray-100">
                                {[
                                    {
                                        icon: <ThumbsUp size={15} className="text-pink-500" />,
                                        bg: "bg-pink-50",
                                        label: "Likes",
                                        value: "N/A",
                                    },
                                    {
                                        icon: <Ticket size={15} className="text-blue-500" />,
                                        bg: "bg-blue-50",
                                        label: "Tickets",
                                        value: "N/A",
                                    },
                                    {
                                        icon: <Crown size={15} className="text-amber-500" />,
                                        bg: "bg-amber-50",
                                        label: "Plan",
                                        value: user?.user_plan || "Free User",
                                    },
                                    {
                                        icon: <MapPin size={15} className="text-emerald-500" />,
                                        bg: "bg-emerald-50",
                                        label: "Location",
                                        value: user?.location || "N/A",
                                    },
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
                    <Field
                        icon={<User size={15} />}
                        label="Username"
                        value={user?.name || "N/A"}
                    />

                    <Field
                        icon={<Mail size={15} />}
                        label="Email Address"
                        value={user?.email || "N/A"}
                    />

                    <Field
                        icon={<Phone size={15} />}
                        label="Contact Number"
                        value={user?.phone || "N/A"}
                    />

                    <Field
                        icon={<Calendar size={15} />}
                        label="Date of Birth"
                        value={formatDate(user?.dob)}
                    />

                    <Field
                        icon={<Info size={15} />}
                        label="Age"
                        value={user?.age ? `${user.age} years` : "N/A"}
                    />

                    <Field
                        icon={<User size={15} />}
                        label="Gender"
                        value={user?.gender || "N/A"}
                    />
                </Section>

                {/* Section: Location */}
                <Section
                    title="Location"
                    accent="border-l-emerald-500"
                    iconBg="bg-l-emerald-50"
                    sectionIcon={<MapPin size={16} className="text-emerald-600" />}
                >
                    <Field
                        icon={<MapPin size={15} />}
                        label="City"
                        value={user?.city || "N/A"}
                    />

                    <Field
                        icon={<MapPin size={15} />}
                        label="State"
                        value={user?.state || "N/A"}
                    />

                    <Field
                        icon={<Globe size={15} />}
                        label="Country"
                        value={user?.country || "N/A"}
                    />

                    <Field
                        icon={<MapPin size={15} />}
                        label="Location"
                        value={user?.location || "N/A"}
                    />
                </Section>

                {/* Section: Professional */}
                <Section
                    title="Professional Details"
                    accent="border-l-purple-500"
                    iconBg="bg-purple-50"
                    sectionIcon={<Briefcase size={16} className="text-purple-600" />}
                >
                    <Field
                        icon={<Briefcase size={15} />}
                        label="Work"
                        value={user?.work || "N/A"}
                    />

                    <Field
                        icon={<Briefcase size={15} />}
                        label="Company"
                        value={user?.company_name || "N/A"}
                    />

                    <Field
                        icon={<GraduationCap size={15} />}
                        label="Education"
                        value={user?.education || "N/A"}
                    />

                    <Field
                        icon={<GraduationCap size={15} />}
                        label="Education Level"
                        value={user?.education_leval || "N/A"}
                    />

                    <Field
                        icon={<DollarSign size={15} />}
                        label="Annual Income"
                        value={user?.annual_income || "N/A"}
                    />

                    <Field
                        icon={<Globe size={15} />}
                        label="Languages"
                        value={languages}
                    />
                </Section>

                {/* Section: Lifestyle */}
                <Section
                    title="Lifestyle & Preferences"
                    accent="border-l-rose-500"
                    iconBg="bg-rose-50"
                    sectionIcon={<Heart size={16} className="text-rose-600" />}
                >
                    <Field
                        icon={<Heart size={15} />}
                        label="Interest"
                        value={selectedInterests}
                    />

                    <Field
                        icon={<Heart size={15} />}
                        label="Religion"
                        value={user?.religion || "N/A"}
                    />

                    <Field
                        icon={<Star size={15} />}
                        label="Star Sign"
                        value={user?.star_sign || "N/A"}
                    />

                    <Field
                        icon={<Dumbbell size={15} />}
                        label="Exercise"
                        value={user?.exercise || "N/A"}
                    />

                    <Field
                        icon={<Info size={15} />}
                        label="Diet Plan"
                        value={user?.diet_plan || "N/A"}
                    />

                    <Field
                        icon={<Info size={15} />}
                        label="Height"
                        value={user?.height || "N/A"}
                    />

                    <Field
                        icon={<Cigarette size={15} />}
                        label="Smoking"
                        value={user?.smoking || "N/A"}
                    />

                    <Field
                        icon={<Wine size={15} />}
                        label="Drinking"
                        value={user?.drinking || "N/A"}
                    />
                </Section>

                {/* Section: Relationship */}
                <Section
                    title="Relationship & Family"
                    accent="border-l-amber-500"
                    iconBg="bg-amber-50"
                    sectionIcon={<Heart size={16} className="text-amber-600" />}
                >
                    <Field
                        icon={<Heart size={15} />}
                        label="Relation Status"
                        value={user?.relation_status || "N/A"}
                    />

                    <Field
                        icon={<Heart size={15} />}
                        label="Married Status"
                        value={user?.married_status || "N/A"}
                    />

                    <Field
                        icon={<Baby size={15} />}
                        label="Have Children"
                        value={haveChildren}
                    />

                    <Field
                        icon={<Baby size={15} />}
                        label="Want More Children"
                        value={user?.more_children || "N/A"}
                    />

                    <Field
                        icon={<Heart size={15} />}
                        label="Looking For"
                        value={wantDate}
                    />
                </Section>

            </div>
        </div>
    );
}
