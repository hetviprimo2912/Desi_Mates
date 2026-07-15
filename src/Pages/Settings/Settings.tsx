import { useEffect, useState } from "react";
import {
    Eye, EyeOff, Shield, Key, Link2, Globe,
    Pencil, Save, CheckCircle2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store/store";
import { fetch_settings, update_settings } from "../../Store/slices/SettingsSlice/settings_thunk";

interface SettingsField {
    key: string;
    label: string;
    placeholder: string;
    type?: "text" | "password" | "url";
    icon: React.ReactNode;
    hint?: string;
}

interface SettingsSection {
    title: string;
    description: string;
    accent: string;
    iconBg: string;
    sectionIcon: React.ReactNode;
    fields: SettingsField[];
}

const sections: SettingsSection[] = [
    {
        title: "Legal & Policies",
        description: "Public-facing policy URLs shown to users",
        accent: "border-l-blue-500",
        iconBg: "bg-blue-50",
        sectionIcon: <Shield size={20} className="text-blue-600" />,
        fields: [
            {
                key: "privacy_policy",
                label: "Privacy Policy URL",
                placeholder: "https://desimates.com/privacy-policy",
                type: "url",
                icon: <Link2 size={16} className="text-gray-400" />,
                hint: "Link to your privacy policy page",
            },
            {
                key: "term_conditions",
                label: "Terms & Conditions URL",
                placeholder: "https://desimates.com/terms-and-condition",
                type: "url",
                icon: <Link2 size={16} className="text-gray-400" />,
                hint: "Link to your terms and conditions page",
            },
        ],
    },
    {
        title: "API Keys & Integrations",
        description: "Third-party service credentials — keep these secret",
        accent: "border-l-purple-500",
        iconBg: "bg-purple-50",
        sectionIcon: <Key size={20} className="text-purple-600" />,
        fields: [
            {
                key: "twilio_key",
                label: "Twilio Key",
                placeholder: "Enter your Twilio API key",
                type: "password",
                icon: <Key size={16} className="text-gray-400" />,
                hint: "Used for SMS and voice services",
            },
            {
                key: "agora_key",
                label: "Agora Key",
                placeholder: "Enter your Agora App ID",
                type: "password",
                icon: <Key size={16} className="text-gray-400" />,
                hint: "Used for real-time video/audio features",
            },
            {
                key: "stripe_key",
                label: "Stripe Secret Key",
                placeholder: "sk_test_...",
                type: "password",
                icon: <Key size={16} className="text-gray-400" />,
                hint: "Used for payment processing",
            },
            {
                key: "stripe_public_key",
                label: "Stripe Public Key",
                placeholder: "pk_live_...",
                type: "password",
                icon: <Key size={16} className="text-gray-400" />,
                hint: "Publishable key for Stripe",
            },
            {
                key: "stripe_private_key",
                label: "Stripe Private Key",
                placeholder: "sk_live_...",
                type: "password",
                icon: <Key size={16} className="text-gray-400" />,
                hint: "Secret key for Stripe live payments",
            },
        ],
    },
    {
        title: "App URLs",
        description: "Share links and API endpoint configuration",
        accent: "border-l-emerald-500",
        iconBg: "bg-emerald-50",
        sectionIcon: <Globe size={20} className="text-emerald-600" />,
        fields: [
            {
                key: "share_url",
                label: "Share URL (Android)",
                placeholder: "https://desimates.com/share",
                type: "url",
                icon: <Link2 size={16} className="text-gray-400" />,
                hint: "Deep link for Android app sharing",
            },
            {
                key: "ios_share_url",
                label: "Share URL (iOS)",
                placeholder: "https://desimates.com/ios-share",
                type: "url",
                icon: <Link2 size={16} className="text-gray-400" />,
                hint: "Deep link for iOS app sharing",
            },
            {
                key: "api_url",
                label: "API Base URL",
                placeholder: "http://18.226.98.215/public/api/",
                type: "url",
                icon: <Globe size={16} className="text-gray-400" />,
                hint: "Backend API endpoint used by the app",
            },
        ],
    },
];

const EMPTY_VALUES = {
    privacy_policy: "",
    term_conditions: "",
    twilio_key: "",
    agora_key: "",
    stripe_key: "",
    share_url: "",
    ios_share_url: "",
    api_url: "",
    stripe_public_key: "",
    stripe_private_key: "",
};

export default function Settings() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, saving } = useSelector((state: RootState) => state.settings);

    const [values, setValues] = useState<Record<string, string>>(EMPTY_VALUES);
    const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        dispatch(fetch_settings());
    }, [dispatch]);

    useEffect(() => {
        if (data) {
            setValues({
                privacy_policy: data.privacy_policy ?? "",
                term_conditions: data.term_conditions ?? "",
                twilio_key: data.twilio_key ?? "",
                agora_key: data.agora_key ?? "",
                stripe_key: data.stripe_key ?? "",
                share_url: data.share_url ?? "",
                ios_share_url: data.ios_share_url ?? "",
                api_url: data.api_url ?? "",
                stripe_public_key: data.stripe_public_key ?? "",
                stripe_private_key: data.stripe_private_key ?? "",
            });
        }
    }, [data]);

    const toggleVisibility = (key: string) =>
        setVisibleFields(prev => ({ ...prev, [key]: !prev[key] }));

    const handleChange = (key: string, value: string) =>
        setValues(prev => ({ ...prev, [key]: value }));

    const handleSave = async () => {
        await dispatch(update_settings({
            privacy_policy: values.privacy_policy,
            term_conditions: values.term_conditions,
            twilio_key: values.twilio_key,
            agora_key: values.agora_key,
            stripe_key: values.stripe_key,
            share_url: values.share_url,
            ios_share_url: values.ios_share_url,
            api_url: values.api_url,
            stripe_public_key: values.stripe_public_key,
            stripe_private_key: values.stripe_private_key,
        })).unwrap();
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleCancel = () => {
        if (data) {
            setValues({
                privacy_policy: data.privacy_policy ?? "",
                term_conditions: data.term_conditions ?? "",
                twilio_key: data.twilio_key ?? "",
                agora_key: data.agora_key ?? "",
                stripe_key: data.stripe_key ?? "",
                share_url: data.share_url ?? "",
                ios_share_url: data.ios_share_url ?? "",
                api_url: data.api_url ?? "",
                stripe_public_key: data.stripe_public_key ?? "",
                stripe_private_key: data.stripe_private_key ?? "",
            });
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-gray-400">
                Loading settings...
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 text-[#111827]">
            <div className="px-4 sm:px-8 pt-6 pb-16">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-8">
                    <div>
                        <h1 className="text-[28px] font-bold text-[#101828]">Settings</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            <span className="text-[#2563EB] cursor-pointer hover:underline">Home</span>
                            <span className="mx-1.5 text-gray-300">/</span>
                            <span className="text-gray-500">Settings Details</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start sm:self-auto">
                        {saved && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-[10px] text-emerald-700 text-sm font-medium">
                                <CheckCircle2 size={16} />
                                Saved successfully
                            </div>
                        )}
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-sm"
                            >
                                <Pencil size={16} />
                                Edit Settings
                            </button>
                        )}
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map(section => (
                        <div
                            key={section.title}
                            className="bg-white rounded-[14px] border border-gray-200 overflow-hidden shadow-sm"
                        >
                            <div className={`flex items-center gap-4 px-6 py-4 border-b border-gray-100 border-l-4 ${section.accent}`}>
                                <div className={`w-9 h-9 rounded-[10px] ${section.iconBg} flex items-center justify-center shrink-0`}>
                                    {section.sectionIcon}
                                </div>
                                <div>
                                    <h2 className="text-[16px] font-semibold text-[#101828]">{section.title}</h2>
                                    <p className="text-[13px] text-gray-500">{section.description}</p>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map(field => {
                                    const isPassword = field.type === "password";
                                    const isVisible = visibleFields[field.key];

                                    return (
                                        <div key={field.key} className={["stripe_key", "stripe_public_key", "stripe_private_key", "api_url"].includes(field.key) ? "md:col-span-2" : ""}>
                                            <label className="block mb-1.5 text-[13px] font-semibold text-[#374151] uppercase tracking-wide">
                                                {field.label}
                                            </label>
                                            {field.hint && (
                                                <p className="text-[12px] text-gray-400 mb-2">{field.hint}</p>
                                            )}
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    {field.icon}
                                                </span>
                                                <input
                                                    type={isPassword && !isVisible ? "password" : "text"}
                                                    value={values[field.key] ?? ""}
                                                    onChange={e => handleChange(field.key, e.target.value)}
                                                    placeholder={field.placeholder}
                                                    disabled={!isEditing}
                                                    className={`w-full h-11 rounded-[10px] border pl-9 pr-11 text-[13.5px] outline-none transition-all
                                                        ${isEditing
                                                            ? "border-gray-300 bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-50 text-[#111827]"
                                                            : "border-gray-200 bg-[#f8f9fb] text-[#374151] cursor-default select-all"
                                                        }`}
                                                />
                                                {isPassword && (
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleVisibility(field.key)}
                                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    >
                                                        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Save Bar */}
                {isEditing && (
                    <div className="fixed bottom-0 left-0 right-0 lg:left-[280px] z-40 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between shadow-lg">
                        <p className="text-sm text-gray-500">You have unsaved changes</p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="px-5 py-2 rounded-[10px] border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2 rounded-[10px] bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Save size={15} />
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
