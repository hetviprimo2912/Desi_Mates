import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    ArrowLeft, User, Mail, Phone, MapPin, Calendar,
    Briefcase, Heart, Globe, Star, GraduationCap,
    Dumbbell, Cigarette, Wine, Baby, DollarSign,
    Ticket, Crown, Info, CreditCard, RefreshCw,
} from "lucide-react";
import type { AppDispatch, RootState } from "../../Store/store";
import { subscriber_user_profile } from "../../Store/slices/UsersSlice/subscriber_user_profile_thunk";
import Tags from "../../Components/Tags";

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
        <div className="bg-white rounded-[14px] border border-gray-200 shadow-sm overflow-hidden">
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

function SkeletonField() {
    return (
        <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="h-5 w-36 rounded bg-gray-100" />
        </div>
    );
}

function SkeletonSection({ title, accent, iconBg, sectionIcon, count = 6 }: Omit<SectionProps, "children"> & { count?: number }) {
    return (
        <Section title={title} accent={accent} iconBg={iconBg} sectionIcon={sectionIcon}>
            {[...Array(count)].map((_, i) => <SkeletonField key={i} />)}
        </Section>
    );
}

const fmt = (val?: string | null) => val || "—";
const fmtDate = (iso?: string | null) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
};

export default function SubscribedUserView() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { user, about, subscription_details, loading } = useSelector(
        (state: RootState) => state.subscriber_user_profile
    );

    useEffect(() => {
        if (id) dispatch(subscriber_user_profile({ user_id: Number(id) }));
    }, [dispatch, id]);

    const initials = user?.name
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "?";

    const selectedInterests = user?.interest?.filter((i) => i.is_selected === "1") ?? [];

    return (
        <div className="w-full min-h-screen bg-gray-50 text-[#111827]">
            <div className="px-4 sm:px-8 pt-6 pb-16 space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#101828]">Subscriber Profile</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="text-[#2563EB] cursor-pointer hover:underline" onClick={() => navigate("/sub-users")}>
                                Subscribed Users
                            </span>
                            <span className="mx-1.5 text-gray-300">/</span>
                            <span>View User</span>
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/sub-users")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>
                </div>

                {/* Profile Hero Card */}
                <div className="bg-white rounded-[14px] border border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">

                        {/* Left accent panel */}
                        <div className="relative md:w-56 bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-100 flex flex-col items-center justify-center py-10 px-6 shrink-0 overflow-hidden border-r border-blue-200">
                            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-blue-200/30" />
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-200/25" />

                            {loading ? (
                                <div className="animate-pulse flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-full bg-gray-200" />
                                    <div className="h-4 w-28 rounded bg-gray-200" />
                                    <div className="h-3 w-36 rounded bg-gray-100" />
                                </div>
                            ) : (
                                <>
                                    <div className="relative z-10 w-20 h-20 rounded-full ring-4 ring-white bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0 overflow-hidden">
                                        {user?.profile_pic
                                            ? <img src={user.profile_pic} alt={user.name} className="w-full h-full object-cover" />
                                            : initials
                                        }
                                    </div>
                                    <h2 className="relative z-10 mt-3 text-[16px] font-bold text-[#1e3a5f] text-center leading-tight">{fmt(user?.name)}</h2>
                                    <p className="relative z-10 mt-1 text-[11.5px] text-blue-800 text-center break-all">{fmt(user?.email)}</p>
                                    <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-1.5">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${user?.approved === 1 ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-500 border-red-200"}`}>
                                            {user?.approved === 1 ? "✓ Verified" : "✗ Not Verified"}
                                        </span>
                                        {user?.subsciber_plan_name && (
                                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-600 border border-purple-200">
                                                {user.subsciber_plan_name}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right content */}
                        <div className="flex-1 flex flex-col justify-between p-6 gap-5">
                            {loading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-6 w-40 rounded bg-gray-200" />
                                    <div className="flex gap-2">
                                        <div className="h-5 w-16 rounded-full bg-gray-200" />
                                        <div className="h-5 w-16 rounded-full bg-gray-200" />
                                    </div>
                                    <div className="h-4 w-64 rounded bg-gray-100" />
                                    <div className="grid grid-cols-4 gap-3 pt-2">
                                        {[...Array(4)].map((_, i) => <div key={i} className="h-14 rounded-[10px] bg-gray-100" />)}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div>
                                            <h2 className="text-[22px] font-bold text-[#101828]">{fmt(user?.name)}</h2>
                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                                {user?.gender && <Tags text={user.gender} variant="gray" />}
                                                {user?.age && <Tags text={`${user.age} yrs`} variant="blue" />}
                                                {user?.relation_status && <Tags text={user.relation_status} variant="purple" />}
                                                {user?.subsciber_status && (
                                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                                        {user.subsciber_status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-[13px] text-gray-400">{fmt(user?.phone)}</p>
                                            <p className="text-[13px] text-gray-400 mt-0.5">{[user?.city, user?.country].filter(Boolean).join(", ")}</p>
                                        </div>
                                    </div>

                                    {user?.bio && (
                                        <p className="text-[13.5px] text-gray-500 leading-relaxed border-l-2 border-blue-200 pl-3 italic">
                                            "{user.bio}"
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-100">
                                        {[
                                            { icon: <Ticket size={15} className="text-blue-500" />, bg: "bg-blue-50", label: "Plan", value: user?.subsciber_plan_name ?? "—" },
                                            { icon: <Crown size={15} className="text-purple-500" />, bg: "bg-purple-50", label: "Price", value: user?.price ?? "—" },
                                            { icon: <MapPin size={15} className="text-emerald-500" />, bg: "bg-emerald-50", label: "Location", value: [user?.city, user?.country].filter(Boolean).join(", ") || "—" },
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
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* About badges */}
                {!loading && about.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {about.map((a, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                                <img src={a.image} alt={a.name} className="w-5 h-5 object-contain" />
                                <span className="text-[13px] font-medium text-[#374151]">{a.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Subscription Details */}
                {loading ? (
                    <SkeletonSection title="Subscription Details" accent="border-l-purple-500" iconBg="bg-purple-50" sectionIcon={<Crown size={16} className="text-purple-600" />} count={6} />
                ) : (
                    <Section title="Subscription Details" accent="border-l-purple-500" iconBg="bg-purple-50" sectionIcon={<Crown size={16} className="text-purple-600" />}>
                        <Field icon={<Crown size={15} />} label="Subscription Plan" value={fmt(user?.subsciber_plan_name)} />
                        <Field icon={<Calendar size={15} />} label="Plan Purchase Date" value={fmtDate(user?.plan_purchase_date)} />
                        <Field icon={<Calendar size={15} />} label="Renewal Date" value={fmt(user?.renewal_date)} />
                        <Field icon={<Info size={15} />} label="Status" value={
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${user?.subsciber_status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                {fmt(user?.subsciber_status)}
                            </span>
                        } />
                        <Field icon={<CreditCard size={15} />} label="Payment Method" value={fmt(user?.payment_method)} />
                        <Field icon={<RefreshCw size={15} />} label="Auto Renewal" value={fmt(user?.auto_renewal)} />
                        {subscription_details && (
                            <>
                                <Field icon={<Info size={15} />} label="Reference No." value={fmt(subscription_details.reference_num)} />
                                <Field icon={<Calendar size={15} />} label="Start Date" value={fmtDate(subscription_details.start_date)} />
                                <Field icon={<Calendar size={15} />} label="Expire Date" value={fmtDate(subscription_details.expire_date)} />
                            </>
                        )}
                        <Field icon={<DollarSign size={15} />} label="Price" value={fmt(user?.price)} />
                    </Section>
                )}

                {/* Basic Info */}
                {loading ? (
                    <SkeletonSection title="Basic Information" accent="border-l-blue-500" iconBg="bg-blue-50" sectionIcon={<User size={16} className="text-blue-600" />} />
                ) : (
                    <Section title="Basic Information" accent="border-l-blue-500" iconBg="bg-blue-50" sectionIcon={<User size={16} className="text-blue-600" />}>
                        <Field icon={<User size={15} />} label="Username" value={fmt(user?.username || user?.name)} />
                        <Field icon={<Mail size={15} />} label="Email Address" value={fmt(user?.email)} />
                        <Field icon={<Phone size={15} />} label="Contact Number" value={fmt(user?.phone)} />
                        <Field icon={<Calendar size={15} />} label="Date of Birth" value={fmtDate(user?.dob)} />
                        <Field icon={<Info size={15} />} label="Age" value={user?.age ? `${user.age} years` : "—"} />
                        <Field icon={<User size={15} />} label="Gender" value={fmt(user?.gender)} />
                    </Section>
                )}

                {/* Location */}
                {loading ? (
                    <SkeletonSection title="Location" accent="border-l-emerald-500" iconBg="bg-emerald-50" sectionIcon={<MapPin size={16} className="text-emerald-600" />} count={4} />
                ) : (
                    <Section title="Location" accent="border-l-emerald-500" iconBg="bg-emerald-50" sectionIcon={<MapPin size={16} className="text-emerald-600" />}>
                        <Field icon={<MapPin size={15} />} label="City" value={fmt(user?.city)} />
                        <Field icon={<MapPin size={15} />} label="State" value={fmt(user?.state)} />
                        <Field icon={<Globe size={15} />} label="Country" value={fmt(user?.country)} />
                        <Field icon={<MapPin size={15} />} label="Address" value={fmt(user?.address)} />
                    </Section>
                )}

                {/* Professional */}
                {loading ? (
                    <SkeletonSection title="Professional Details" accent="border-l-indigo-500" iconBg="bg-indigo-50" sectionIcon={<Briefcase size={16} className="text-indigo-600" />} />
                ) : (
                    <Section title="Professional Details" accent="border-l-indigo-500" iconBg="bg-indigo-50" sectionIcon={<Briefcase size={16} className="text-indigo-600" />}>
                        <Field icon={<Briefcase size={15} />} label="Work" value={fmt(user?.work)} />
                        <Field icon={<Briefcase size={15} />} label="Company" value={fmt(user?.company_name)} />
                        <Field icon={<GraduationCap size={15} />} label="Education" value={fmt(user?.education)} />
                        <Field icon={<GraduationCap size={15} />} label="Education Level" value={fmt(user?.education_leval)} />
                        <Field icon={<DollarSign size={15} />} label="Annual Income" value={fmt(user?.annual_income)} />
                        <Field icon={<Globe size={15} />} label="Languages" value={user?.languages?.length ? user.languages.join(", ") : "—"} />
                    </Section>
                )}

                {/* Lifestyle */}
                {loading ? (
                    <SkeletonSection title="Lifestyle & Preferences" accent="border-l-rose-500" iconBg="bg-rose-50" sectionIcon={<Heart size={16} className="text-rose-600" />} count={8} />
                ) : (
                    <Section title="Lifestyle & Preferences" accent="border-l-rose-500" iconBg="bg-rose-50" sectionIcon={<Heart size={16} className="text-rose-600" />}>
                        <Field icon={<Heart size={15} />} label="Interests" value={
                            selectedInterests.length > 0
                                ? <div className="flex flex-wrap gap-1.5 mt-1">
                                    {selectedInterests.map(i => (
                                        <span key={i.id} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                                            <img src={i.image} alt={i.name} className="w-3.5 h-3.5 object-contain" />
                                            {i.name}
                                        </span>
                                    ))}
                                </div>
                                : "—"
                        } />
                        <Field icon={<Heart size={15} />} label="Religion" value={fmt(user?.religion)} />
                        <Field icon={<Star size={15} />} label="Star Sign" value={fmt(user?.star_sign)} />
                        <Field icon={<Dumbbell size={15} />} label="Exercise" value={fmt(user?.exercise)} />
                        <Field icon={<Info size={15} />} label="Diet Plan" value={fmt(user?.diet_plan)} />
                        <Field icon={<Info size={15} />} label="Height" value={fmt(user?.height)} />
                        <Field icon={<Cigarette size={15} />} label="Smoking" value={fmt(user?.smoking)} />
                        <Field icon={<Wine size={15} />} label="Drinking" value={fmt(user?.drinking)} />
                    </Section>
                )}

                {/* Relationship */}
                {loading ? (
                    <SkeletonSection title="Relationship & Family" accent="border-l-amber-500" iconBg="bg-amber-50" sectionIcon={<Heart size={16} className="text-amber-600" />} count={5} />
                ) : (
                    <Section title="Relationship & Family" accent="border-l-amber-500" iconBg="bg-amber-50" sectionIcon={<Heart size={16} className="text-amber-600" />}>
                        <Field icon={<Heart size={15} />} label="Relation Status" value={fmt(user?.relation_status)} />
                        <Field icon={<Heart size={15} />} label="Married Status" value={fmt(user?.married_status)} />
                        <Field icon={<Baby size={15} />} label="Have Children" value={user?.have_children === "1" ? "Yes" : user?.have_children === "0" ? "No" : "—"} />
                        <Field icon={<Baby size={15} />} label="Want More Children" value={fmt(user?.more_children)} />
                        <Field icon={<Heart size={15} />} label="Looking For" value={fmt(user?.lookinfor)} />
                        <Field icon={<Heart size={15} />} label="Want to Date" value={user?.want_date?.length ? user.want_date.join(", ") : "—"} />
                    </Section>
                )}

            </div>
        </div>
    );
}
