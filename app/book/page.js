"use client";
import React, { useState } from "react";
import Link from "next/link";

const Book = () => {
    const[name,setName] = useState("");
    const[age,setAge] = useState("");
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const today = new Date();
    const days = [
        {
            label: "Today",
            date: today,
        },
        {
            label: "Tomorrow",
            date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000),
        },
        {
            label: "Day After",
            date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
        },
    ];

    const timeSlots = [
        "9:00 AM", "9:30 AM","10:00 AM","10:30 AM", "11:00 AM", "11:30 AM","12:00 PM","12:30 PM",
        "2:00 PM","2:30 PM", "3:00 PM", "3:30 PM","4:00 PM","4:30 PM", "5:00 PM"
    ];

    const handleDayClick = (date) => {
        setSelectedDay(date);
        setSelectedTime(null); // Reset selected time
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    return (
        <div className="min-h-screen flex flex-col overflow-hidden">
            {/* Navbar */}
            <div className="w-full h-20 bg-blue-500 text-white flex items-center justify-between rounded-b-lg drop-shadow-[0_4px_4px_rgba(59,130,246,0.5)] px-8">
                <div className="text-3xl font-bold flex items-center cursor-pointer">
                    <img src="stethoscope.png" className="w-10 h-10 mr-1" alt="Logo" />
                    MediChamber
                </div>
                <div className="flex items-center gap-6 text-2xl">
                    <Link href="/logout">
                        <h5 className="cursor-pointer hover:text-blue-200 font-semibold">Logout</h5>
                    </Link>
                    <Link href="/contact">
                        <h5 className="cursor-pointer hover:text-blue-200 font-semibold">Contact</h5>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 items-center justify-between px-10 py-10 overflow-hidden">
                {/* Doctor Image */}
                <div className="flex items-center justify-center ml-22">
                    <img
                        src="doctor.jpg"
                        className="max-w-[500px] w-full object-contain "
                        alt="Doctor"
                    />
                </div>
                {/* Booking Section */}
                <div className="flex flex-1 items-center justify-center bg-white  rounded-lg p-8">

                <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-800 mb-2">Patients detail</h1>
                        <div className="flex flex-col items-center">

                            <input 
                            type="text" 
                            placeholder="Enter your name" 
                            className="mt-2 p-2 border rounded-md w-100 max-w-xs text-blue-600"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}  />
                            <input type="text" placeholder="Enter your age" className="mt-2 p-2 border rounded-md w-100 max-w-xs text-blue-600" />
                        </div>

                        <div className="flex space-x-4 items-center mt-4 justify-center ">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="accent-blue-500"
                                />
                                <span>Male</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="accent-pink-500"
                                />
                                <span>Female</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="accent-green-500"
                                />
                                <span>Others</span>
                            </label>
                        </div>


                    </div>
                    
                    <h1 className="text-3xl text-blue-800 font-bold">Plan your clinic visit</h1>

                    {/* Date Select */}
                    <div className="flex gap-4">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => handleDayClick(day.date)}
                                className={`px-4 py-2 rounded-md border ${selectedDay?.toDateString() === day.date.toDateString()
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-blue-700 border-blue-500"
                                    } hover:bg-blue-100 transition`}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>

                    {/* Time Slots */}
                    {selectedDay && (
                        <>
                            <h2 className="text-xl text-gray-700 font-semibold">Select Time</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {timeSlots.map((slot, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleTimeClick(slot)}
                                        className={`px-1 py-1 rounded-md border ${selectedTime === slot
                                            ? "bg-green-500 text-white"
                                            : "bg-white text-green-700 border-green-500"
                                            } hover:bg-green-100 transition`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                    {/* Confirmation */}
                    {selectedDay && selectedTime && (
                        <div className="mt-2 text-blue-800 font-medium text-lg">
                           Confirm booking for {name} <br/>
                            <span className="font-bold">{selectedDay.toDateString()}</span> at{" "}
                            <span className="font-bold">{selectedTime}</span>
                            <div className="mt-4">
                                <button>
                                    <Link href="/payment" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                                        Pay Now
                                    </Link>
                                </button>
                                <button>
                                    <Link href="/confirmed" className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                        onClick={() => alert("Appointment booked successfully!")}>
                                        Pay later
                                    </Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full h-16 bg-blue-500 text-white flex items-center justify-between px-8">
                <p className="text-lg cursor-pointer">©2025 MediChamber</p>
                <div className="flex items-center gap-4">
                    <img src="whatsapp.png" className="w-10 h-10" />
                    <p>:+91XXXXXXXXX</p>
                </div>
            </footer>
        </div>
    );
};

export default Book;
