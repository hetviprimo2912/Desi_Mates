import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import TableHeader from "../../Components/TableHeader";
import Tags from "../../Components/Tags";


import { users_list } from "../../Store/slices/UsersSlice/users_list_thunk";

import type {
    RootState,
    AppDispatch,
} from "../../Store/store";

export default function DashboardUsers() {

    const dispatch =
        useDispatch<AppDispatch>();

    const navigate =
        useNavigate();

    const {
        users,
        loading,
    } = useSelector(
        (state: RootState) =>
            state.users_list
    );

    useEffect(() => {

        dispatch(
            users_list({
                search: "",
                page_no: 1,
                per_page: 5,
            })
        );

    }, [dispatch]);

    const getInitials = (
        name?: string | null
    ) => {

        if (!name) return "N/A";

        const words =
            name.trim().split(" ");

        if (words.length === 1) {
            return words[0]
                .charAt(0)
                .toUpperCase();
        }

        return (
            words[0].charAt(0) +
            words[
                words.length - 1
            ].charAt(0)
        ).toUpperCase();

    };

    const formatDate = (
        date: string
    ) =>
        new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        );

    const formatTime = (
        date: string
    ) =>
        new Date(date).toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
            }
        );

    return (

        <div className="bg-white border border-gray-200 rounded-[12px] overflow-hidden shadow-sm">

            {/* Header */}

            <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-gray-200">

                <h2 className="text-xl sm:text-l font-semibold text-[#101828]">

                    Recent Users

                </h2>

                <button
                    onClick={() =>
                        navigate("/all-users")
                    }
                    className="text-[#2563EB] text-sm font-semibold hover:text-[#1D4ED8]"
                >

                    View All →

                </button>

            </div>

            <div className="overflow-x-auto">

                <table className="w-full min-w-[1200px] border-collapse">

                    <TableHeader
                        columns={[
                            {
                                label: "Profile",
                                width: "90px",
                            },
                            {
                                label: "User Name",
                                width: "180px",
                            },
                            {
                                label: "Email",
                                width: "220px",
                            },
                            {
                                label: "Contact",
                                width: "170px",
                            },
                            {
                                label: "Country",
                                width: "140px",
                            },
                            {
                                label: "Looking For",
                                width: "170px",
                            },
                            {
                                label: "Created At",
                                width: "180px",
                            },
                            {
                                label: "Approved",
                                width: "170px",
                                className:
                                    "text-center",
                            },

                        ]}
                        isAllSelected={false}
                        isIndeterminate={false}
                        onSelectAll={() => { }}
                    />

                    <tbody className="divide-y divide-gray-100">
                        {loading ? (

                            [...Array(5)].map((_, index) => (

                                <tr
                                    key={index}
                                    className="animate-pulse"
                                >

                                    {/* Checkbox */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-4 rounded bg-gray-200" />
                                    </td>

                                    {/* Profile */}

                                    <td className="px-4 py-5">
                                        <div className="w-11 h-11 rounded-full bg-gray-200" />
                                    </td>

                                    {/* User Name */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-32 rounded bg-gray-200" />
                                    </td>

                                    {/* Email */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-44 rounded bg-gray-200" />
                                    </td>

                                    {/* Contact */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-28 rounded bg-gray-200" />
                                    </td>

                                    {/* Country */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-24 rounded bg-gray-200" />
                                    </td>

                                    {/* Looking For */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-24 rounded bg-gray-200" />
                                    </td>

                                    {/* Created */}

                                    <td className="px-4 py-5">
                                        <div className="h-4 w-28 rounded bg-gray-200 mb-2" />
                                        <div className="h-3 w-20 rounded bg-gray-100" />
                                    </td>

                                    {/* Approved */}

                                    <td className="px-4 py-5">
                                        <div className="mx-auto h-6 w-24 rounded-full bg-gray-200" />
                                    </td>


                                </tr>

                            ))

                        ) : (

                            users
                                .slice(0, 5)
                                .map((user) => (

                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >

                                        {/* Checkbox */}

                                        <td className="px-4 py-4">

                                            <input
                                                type="checkbox"
                                                className="rounded-md cursor-pointer border-gray-300 text-indigo-600 h-4.5 w-4.5"
                                            />

                                        </td>

                                        {/* Profile */}

                                        <td className="px-4 py-5 whitespace-nowrap">

                                            <div
                                                className="
                                                    w-11
                                                    h-11
                                                    rounded-full
                                                    bg-blue-100
                                                    text-blue-700
                                                    flex
                                                    items-center
                                                    justify-center
                                                    font-semibold
                                                    text-sm
                                                    border
                                                    border-gray-200
                                                "
                                            >
                                                {getInitials(user.name)}
                                            </div>

                                        </td>

                                        {/* Username */}

                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">

                                            <p className="text-[15px] font-medium text-[#111827]">
                                                {user.name ?? "N/A"}
                                            </p>

                                        </td>

                                        {/* Email */}

                                        <td className="pl-20 px-4 py-5 whitespace-nowrap">

                                            <p className="text-[14px] text-gray-600">
                                                {user.email ?? "N/A"}
                                            </p>

                                        </td>

                                        {/* Contact */}

                                        <td className="pl-10 px-4 py-5 whitespace-nowrap">

                                            <p className="text-[14px] text-gray-600">
                                                {user.phone ?? "N/A"}
                                            </p>

                                        </td>

                                        {/* Country */}

                                        <td className="pl-16 px-4 py-5 whitespace-nowrap">

                                            <p className="text-[14px] text-gray-700">
                                                {user.country ?? "N/A"}
                                            </p>

                                        </td>
                                        {/* Looking For */}

                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">

                                            <span className="text-pink-400 font-bold">
                                                {user.lookinfor ?? "N/A"}
                                            </span>

                                        </td>

                                        {/* Created At */}

                                        <td className="pl-14 px-4 py-5 whitespace-nowrap">

                                            <div className="flex flex-col">

                                                <span className="text-[15px] font-medium text-[#111827]">
                                                    {user.created_at
                                                        ? formatDate(user.created_at)
                                                        : "N/A"}
                                                </span>

                                                <span className="text-[14px] text-gray-500 mt-1">
                                                    {user.created_at
                                                        ? formatTime(user.created_at)
                                                        : "N/A"}
                                                </span>

                                            </div>

                                        </td>

                                        {/* Approved */}

                                        <td className="pl-10 px-4 py-5 whitespace-nowrap">

                                            <Tags
                                                text={
                                                    user.approved === 1
                                                        ? "Approved"
                                                        : user.approved === 0
                                                            ? "Not Approved"
                                                            : "N/A"
                                                }
                                                variant={
                                                    user.approved === 1
                                                        ? "green"
                                                        : user.approved === 0
                                                            ? "red"
                                                            : "gray"
                                                }
                                            />

                                        </td>



                                    </tr>

                                ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );

}