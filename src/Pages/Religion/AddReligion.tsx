
import ReligionForm from "./ReligionForm";
import ReligionLeft from "./ReligionLeft";

export default function AddCategory() {
    return (
        <div className="h-full bg-gray-50">
            <div className="h-full p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">

                    {/* Left Panel */}
                    <div className="h-full">
                        <ReligionLeft />
                    </div>

                    {/* Right Panel */}
                    <div className="h-full">
                        <ReligionForm />
                    </div>

                </div>
            </div>
        </div>
    );
}