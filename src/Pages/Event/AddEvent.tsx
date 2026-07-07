import EventLeft from "./EventLeft";
import EventForm from "./EventForm";

export default function AddEvent() {
    return (
        <div className="h-full bg-gray-50">
            <div className="h-full p-6">
                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">

                    {/* Left Panel */}
                    <div className="h-full">
                        <EventLeft />
                    </div>

                    {/* Right Panel */}
                    <div className="h-full">
                        <EventForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
