"use client";

import { useState } from "react";
import {
  Compass,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  ShieldCheck,
  Mountain,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"bookings" | "tours" | "add-tour">("bookings");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  // Sample State Data (Ready for REST API connection)
  const [bookings, setBookings] = useState([
    {
      id: "booking-1",
      fullName: "Maya Thompson",
      email: "maya.t@domain.co.uk",
      phone: "+44 7700 900077",
      tourTitle: "Kitulgala White Water Rafting Expedition",
      date: "2026-10-15",
      guests: 4,
      status: "confirmed",
      notes: "Need vegetarian lunch for 2 guests.",
    },
    {
      id: "booking-2",
      fullName: "Julien Moreau",
      email: "julien.m@domain.fr",
      phone: "+33 6 12 34 56 78",
      tourTitle: "Kataran-Oya Waterfall Abseiling",
      date: "2026-10-18",
      guests: 2,
      status: "pending",
      notes: "Request morning 9:00 AM slot.",
    },
    {
      id: "booking-3",
      fullName: "Anika Perera",
      email: "anika.p@domain.com.au",
      phone: "+61 400 123 456",
      tourTitle: "Sinharaja Virgin Rainforest Trekking Expedition",
      date: "2026-10-22",
      guests: 3,
      status: "pending",
      notes: "Interested in birdwatching guide.",
    },
  ]);

  const [tours, setTours] = useState([
    {
      id: "kitulgala-white-water-rafting",
      title: "Kitulgala White Water Rafting Expedition",
      location: "Kitulgala, Sabaragamuwa",
      price: 65,
      duration: "3 hours",
      difficulty: "Moderate",
      rating: 4.9,
    },
    {
      id: "jungle-river-canyoning",
      title: "Rainforest Gorge Canyoning & Rock Slides",
      location: "Kitulgala Rainforest",
      price: 89,
      duration: "5 hours",
      difficulty: "Active",
      rating: 4.9,
    },
    {
      id: "waterfall-abseiling-experience",
      title: "Kataran-Oya Waterfall Abseiling",
      location: "Kitulgala, Sabaragamuwa",
      price: 95,
      duration: "4 hours",
      difficulty: "Challenging",
      rating: 4.8,
    },
    {
      id: "sigiriya-rock-pidurangala-heritage-tour",
      title: "Sigiriya Lion Rock Fortress & Pidurangala Sunrise Expedition",
      location: "Sigiriya, Central Province",
      price: 110,
      duration: "Full day",
      difficulty: "Moderate",
      rating: 4.9,
    },
  ]);

  const updateBookingStatus = (id: string, newStatus: string) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const deleteTour = (id: string) => {
    setTours(tours.filter((t) => t.id !== id));
  };

  const filteredBookings = bookings.filter((b) =>
    filterStatus === "all" ? true : b.status === filterStatus
  );

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="grid size-10 place-items-center rounded-xl bg-amber-500 text-slate-950 font-bold">
              <Mountain className="size-6" />
            </div>
            <div>
              <h1 className="font-bold text-base uppercase tracking-wider text-slate-100">Serendib</h1>
              <span className="text-xs text-amber-500 font-semibold tracking-widest uppercase">Admin Portal</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                activeTab === "bookings"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Calendar className="size-4" /> Bookings & Inquiries
            </button>

            <button
              onClick={() => setActiveTab("tours")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                activeTab === "tours"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Compass className="size-4" /> Manage Tours ({tours.length})
            </button>

            <button
              onClick={() => setActiveTab("add-tour")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                activeTab === "add-tour"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <Plus className="size-4" /> Add New Tour
            </button>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3 px-2">
            <div className="size-9 rounded-full bg-slate-800 grid place-items-center font-bold text-xs">
              SA
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Serendib Admin</p>
              <p className="text-[10px] text-slate-500 truncate">admin@serendib.lk</p>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition" title="Logout">
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              Total Inquiries <Calendar className="size-4 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-100 mt-2">{bookings.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              Pending Action <Clock className="size-4 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-amber-500 mt-2">
              {bookings.filter((b) => b.status === "pending").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              Active Packages <Compass className="size-4 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-100 mt-2">{tours.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
              Est. Value <DollarSign className="size-4 text-amber-500" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-400 mt-2">
              ${bookings.reduce((sum, b) => sum + b.guests * 75, 0)}
            </p>
          </div>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Booking Inquiries</h2>
                <p className="text-xs text-slate-400">Manage incoming customer adventure requests.</p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {(["all", "pending", "confirmed", "cancelled"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                      filterStatus === status
                        ? "bg-slate-800 text-amber-500"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-950/50 text-slate-400 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Guest Info</th>
                    <th className="p-4">Tour Requested</th>
                    <th className="p-4">Date & Guests</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <strong className="block text-sm text-slate-100">{b.fullName}</strong>
                        <span className="text-slate-400">{b.email}</span>
                        <span className="block text-slate-500">{b.phone}</span>
                      </td>
                      <td className="p-4 font-semibold text-slate-200 max-w-xs">{b.tourTitle}</td>
                      <td className="p-4">
                        <span className="block font-bold text-slate-200">{b.date}</span>
                        <span className="text-slate-400">{b.guests} Adventurers</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : b.status === "pending"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "confirmed")}
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition"
                            title="Confirm Booking"
                          >
                            <CheckCircle2 className="size-4" />
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "cancelled")}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title="Cancel Booking"
                          >
                            <XCircle className="size-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Tours */}
        {activeTab === "tours" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-100">Tour Packages</h2>
                <p className="text-xs text-slate-400">View and manage published adventure tours.</p>
              </div>
              <button
                onClick={() => setActiveTab("add-tour")}
                className="flex items-center gap-2 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-amber-400 transition"
              >
                <Plus className="size-4" /> Add New Tour
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {tours.map((t) => (
                <div key={t.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-slate-100">{t.title}</h3>
                      <button
                        onClick={() => deleteTour(t.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition"
                        title="Delete Tour"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{t.location}</p>
                    <div className="flex gap-4 text-xs font-semibold text-slate-300 mt-4">
                      <span>⏱ {t.duration}</span>
                      <span>🛡 {t.difficulty}</span>
                      <span>⭐ {t.rating}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-6 pt-4 border-t border-slate-800">
                    <strong className="text-xl font-extrabold text-amber-500">${t.price} / person</strong>
                    <span className="text-xs font-bold text-emerald-400">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Add New Tour */}
        {activeTab === "add-tour" && (
          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">Add New Adventure Package</h2>
            <p className="text-xs text-slate-400 mb-6">Fill in details to publish a new tour package to the database.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Tour package created successfully!");
                setActiveTab("tours");
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-400 font-bold mb-1">Tour Title</label>
                <input required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100" placeholder="e.g. Kitulgala Kayaking & Waterfall Jump" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Location</label>
                  <input required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100" placeholder="e.g. Kitulgala" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Price ($ USD)</label>
                  <input required type="number" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100" placeholder="75" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Duration</label>
                  <input required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100" placeholder="e.g. 4 Hours" />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Difficulty</label>
                  <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100">
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Active</option>
                    <option>Challenging</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Overview & Description</label>
                <textarea required rows={3} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100" placeholder="Describe the adventure..." />
              </div>

              <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-amber-400 transition text-sm">
                Publish Adventure Package
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
