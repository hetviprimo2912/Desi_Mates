import InterestLeft from "./InterestLeft";
import InterestForm from "./InterestForm";

export default function AddCategory() {
    return (
        <div className="h-full bg-gray-50">
            <div className="h-full p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">

                    {/* Left Panel */}
                    <div className="h-full">
                        <InterestLeft />
                    </div>

                    {/* Right Panel */}
                    <div className="h-full">
                        <InterestForm />
                    </div>

                </div>
            </div>
        </div>
    );
}