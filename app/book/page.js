"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use useRouter for programmatic navigation

const Book = () => {
    // Improvement 1: Centralized state for form data
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        age: "",
        gender: "",
    });

    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState(""); // State for validation errors
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submission status

    const router = useRouter();

    // Improvement 2: Single handler for all form inputs
    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setPatientDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    
    // --- Date and Time Configuration ---
    const today = new Date();
    const days = [
        {
            label: "Today",
            date: today,
        },
        {
            label: "Tomorrow",
            date: new Date(new Date().setDate(today.getDate() + 1)),
        },
        {
            label: "Day After",
            date: new Date(new Date().setDate(today.getDate() + 2)),
        },
    ];

    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM", "05:00 PM"
    ];

    // --- Event Handlers ---
    const handleDayClick = (date) => {
        setSelectedDay(date);
        setSelectedTime(null); // Reset time when day changes
        setError(""); // Clear previous errors
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
        setError(""); // Clear previous errors
    };

    // Improvement 3: Robust form submission handler
    const handleSubmit = async (paymentMethod) => {
        // Validation Check
        if (!patientDetails.name || !patientDetails.age || !patientDetails.gender) {
            setError("Please fill in all patient details.");
            return;
        }
        if (!selectedDay || !selectedTime) {
            setError("Please select a date and time for your visit.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        // Here you would typically send the data to your backend API
        const appointmentData = {
            ...patientDetails,
            date: selectedDay.toISOString().split('T')[0], // format date as YYYY-MM-DD
            time: selectedTime,
            paymentMethod,
        };

        console.log("Booking Submitted:", appointmentData);
        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (paymentMethod === 'pay_later') {
            alert("Appointment booked successfully!");
            router.push("/confirmed"); // Navigate after logic is complete
        } else {
            // Navigate to payment page with booking details (e.g., in query params or state management)
            router.push("/payment");
        }
        
        setIsSubmitting(false);
    };

    // Improvement 4: UX Enhancement - Disable past time slots for today
    const isTimeSlotAvailable = (slot) => {
        if (selectedDay?.toDateString() !== today.toDateString()) {
            return true; // All slots are available for future dates
        }
        const now = new Date();
        const [time, modifier] = slot.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') hours = '0';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;

        const slotTime = new Date(today);
        slotTime.setHours(hours, minutes, 0, 0);
        
        return now < slotTime;
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
            {/* Navbar */}
            <div className="w-full h-20 bg-blue-500 text-white flex items-center justify-between shadow-lg px-4 sm:px-8">
                 <div className="text-2xl sm:text-3xl font-bold flex items-center cursor-pointer">
                    <img src="/stethoscope.png" className="w-10 h-10 mr-2" alt="Logo" />
                    MediChamber
                </div>
                <div className="flex items-center gap-4 sm:gap-6 text-xl sm:text-2xl">
                    <Link href="/logout" className="font-semibold hover:text-blue-200 transition-colors">
                        Logout
                    </Link>
                    <Link href="/contact" className="font-semibold hover:text-blue-200 transition-colors">
                        Contact
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 p-4 sm:p-10">
                {/* Doctor Image */}
                <div className="w-full lg:w-1/3 flex items-center justify-center">
                    <img
                        src="/doctor.jpg"
                        className="max-w-[300px] md:max-w-[400px] w-full object-contain"
                        alt="A friendly cartoon doctor"
                    />
                </div>
                
                {/* Booking Section */}
                <div className="w-full lg:w-2/3 max-w-3xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        
                        {/* --- Patient Details --- */}
                        <div className="w-full">
                            <h1 className="text-3xl font-bold text-blue-800 mb-4 text-center">Patient Details</h1>
                            <div className="flex flex-col items-center gap-3">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Enter your name" 
                                    className="p-3 border-2 rounded-md w-full max-w-sm focus:border-blue-500 focus:ring-blue-500 transition"
                                    value={patientDetails.name}
                                    onChange={handleDetailChange}
                                />
                                <input 
                                    type="number" 
                                    name="age"
                                    placeholder="Enter your age" 
                                    className="p-3 border-2 rounded-md w-full max-w-sm focus:border-blue-500 focus:ring-blue-500 transition"
                                    value={patientDetails.age} // Bug Fix: Added value
                                    onChange={handleDetailChange} // Bug Fix: Added onChange
                                />
                                <div className="flex space-x-6 items-center mt-2 justify-center text-gray-700">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="gender" value="male" className="accent-blue-500" checked={patientDetails.gender === 'male'} onChange={handleDetailChange} />
                                        <span>Male</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="gender" value="female" className="accent-pink-500" checked={patientDetails.gender === 'female'} onChange={handleDetailChange} />
                                        <span>Female</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="gender" value="others" className="accent-green-500" checked={patientDetails.gender === 'others'} onChange={handleDetailChange} /> {/* Bug Fix: Corrected value */}
                                        <span>Others</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* --- Plan Visit --- */}
                        <div className="w-full">
                             <h1 className="text-3xl text-blue-800 font-bold text-center mb-4">Plan Your Clinic Visit</h1>
                            {/* Date Select */}
                            <div className="flex justify-center gap-2 sm:gap-4">
                                {days.map((day, index) => (
                                    <button key={index} onClick={() => handleDayClick(day.date)}
                                        className={`px-4 py-2 rounded-md border-2 font-semibold transition ${selectedDay?.toDateString() === day.date.toDateString()
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-white text-blue-700 border-blue-500 hover:bg-blue-50"
                                        }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDay && (
                            <div className="w-full text-center">
                                <h2 className="text-xl text-gray-700 font-semibold mb-3">Select Time</h2>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {timeSlots.map((slot, idx) => {
                                        const isAvailable = isTimeSlotAvailable(slot);
                                        return (
                                            <button key={idx} onClick={() => isAvailable && handleTimeClick(slot)}
                                                disabled={!isAvailable}
                                                className={`p-2 rounded-md border-2 font-medium transition ${
                                                    selectedTime === slot
                                                        ? "bg-green-500 text-white border-green-500"
                                                        : "bg-white text-green-700 border-green-500"
                                                    } ${
                                                    isAvailable 
                                                        ? "hover:bg-green-50 cursor-pointer" 
                                                        : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                                                }`}
                                            >
                                                {slot}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Validation Error Message */}
                        {error && (
                            <p className="text-red-500 font-semibold mt-2">{error}</p>
                        )}

                        {/* Confirmation & Submission */}
                        {selectedDay && selectedTime && (
                            <div className="mt-4 text-center text-blue-800 font-medium text-lg bg-blue-50 p-4 rounded-lg">
                                Confirm booking for <span className="font-bold">{patientDetails.name || 'Patient'}</span>
                                <br/> on <span className="font-bold">{selectedDay.toDateString()}</span> at <span className="font-bold">{selectedTime}</span>.
                                <div className="mt-4 flex justify-center gap-4">
                                    {/* Improvement 5: Correct use of buttons for actions */}
                                    <button 
                                        onClick={() => handleSubmit('pay_now')} 
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition disabled:bg-blue-300">
                                        {isSubmitting ? 'Processing...' : 'Pay Now'}
                                    </button>
                                    <button 
                                        onClick={() => handleSubmit('pay_later')}
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition disabled:bg-green-300">
                                        {isSubmitting ? 'Processing...' : 'Pay Later'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full h-16 bg-blue-500 text-white flex items-center justify-between px-4 sm:px-8">
                <p className="text-lg">©{new Date().getFullYear()} MediChamber</p>
                <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-200">
                    <img src="/whatsapp.png" className="w-8 h-8" alt="WhatsApp"/>
                    <p className="hidden sm:block">+91 XXXXXXXXXX</p>
                </a>
            </footer>
        </div>
    );
};

export default Book;