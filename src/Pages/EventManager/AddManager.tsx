import ManagerLeft from "./ManagerLeft";
import ManagerForm from "./ManagerForm";

export default function AddManager() {
    return (
        <div className="h-full bg-gray-50">
            <div className="h-full p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">
                    <div className="h-full">
                        <ManagerLeft />
                    </div>
                    <div className="h-full">
                        <ManagerForm />
                    </div>
                </div>
            </div>
        </div>
    );
}
