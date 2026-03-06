"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  LogOut, 
  Loader2, 
  XCircle,
  Award
} from 'lucide-react';

// GSAP Import
import gsap from 'gsap';

interface Certificate {
  id: string;
  cpd_number: string;
  student_name: string;
  course_name: string;
  course_duration: string;
  completion_date: string;
}

export default function AdminDashboard() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    cpd_number: '',
    student_name: '',
    course_name: '',
    course_duration: '',
    completion_date: ''
  });

  useEffect(() => {
    checkUser();
    fetchCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-animate", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) router.push('/login');
  };

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setCertificates(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingCert) {
        const { error } = await supabase
          .from('certificates')
          .update(formData)
          .eq('id', editingCert.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('certificates')
          .insert([formData]);
        if (error) throw error;
      }

      setShowModal(false);
      setEditingCert(null);
      setFormData({
        cpd_number: '',
        student_name: '',
        course_name: '',
        course_duration: '',
        completion_date: ''
      });
      fetchCertificates();
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert);
    setFormData({
      cpd_number: cert.cpd_number,
      student_name: cert.student_name,
      course_name: cert.course_name,
      course_duration: cert.course_duration,
      completion_date: cert.completion_date
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (!error) fetchCertificates();
  };

  const filteredCertificates = certificates.filter(cert => 
    cert.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.cpd_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 pt-24 sm:pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="gsap-animate flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-navy">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage student certificates and records.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => {
                setEditingCert(null);
                setFormData({
                  cpd_number: '',
                  student_name: '',
                  course_name: '',
                  course_duration: '',
                  completion_date: ''
                });
                setShowModal(true);
              }}
              className="flex-1 sm:flex-none justify-center bg-gold text-white px-5 sm:px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-navy transition-all shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-5 h-5" />
              Add New
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 sm:flex-none justify-center bg-white text-navy border border-slate-200 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all text-sm sm:text-base"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats & Search */}
        <div className="gsap-animate grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by student name or CPD number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-sm text-navy"
            />
          </div>
          <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-70 font-bold mb-1">Total Records</div>
              <div className="text-3xl font-serif text-gold">{certificates.length}</div>
            </div>
            <Award className="w-10 h-10 opacity-20" />
          </div>
        </div>

        {/* Table */}
        <div className="gsap-animate bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden w-full">
          <div className="overflow-x-auto w-full pb-4 sm:pb-0">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Student Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Course</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">CPD Number</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto" />
                    </td>
                  </tr>
                ) : filteredCertificates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  filteredCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-navy whitespace-nowrap">{cert.student_name}</td>
                      <td className="px-6 py-4 text-slate-600 text-sm whitespace-nowrap">{cert.course_name}</td>
                      <td className="px-6 py-4 font-mono text-xs font-bold text-gold whitespace-nowrap">{cert.cpd_number}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm whitespace-nowrap">
                        {new Date(cert.completion_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button 
                          onClick={() => handleEdit(cert)}
                          className="p-2 text-slate-400 hover:text-gold transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cert.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fixed Modal - Never Cuts Off Content */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-navy/60 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal Card - Flex Column with Max Height */}
            <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
              
              {/* Fixed Header */}
              <div className="bg-navy p-5 sm:p-6 text-white flex justify-between items-center rounded-t-[2rem]">
                <h2 className="text-xl font-serif">
                  {editingCert ? 'Edit Certificate' : 'Add New Certificate'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              {/* Scrollable Form Body */}
              <form id="certificate-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Student Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.student_name}
                      onChange={(e) => setFormData({...formData, student_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-navy"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">CPD Number</label>
                    <input 
                      required
                      type="text"
                      value={formData.cpd_number}
                      onChange={(e) => setFormData({...formData, cpd_number: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-navy"
                      placeholder="e.g. CPD-12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Course Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.course_name}
                      onChange={(e) => setFormData({...formData, course_name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-navy"
                      placeholder="e.g. Botox Masterclass"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Duration</label>
                    <input 
                      required
                      type="text"
                      value={formData.course_duration}
                      onChange={(e) => setFormData({...formData, course_duration: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-navy"
                      placeholder="e.g. 2 Days Intensive"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Completion Date</label>
                    <input 
                      required
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none text-navy"
                    />
                  </div>
                </div>
              </form>

              {/* Fixed Footer with Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 p-5 sm:p-8 border-t border-slate-100 bg-white rounded-b-[2rem]">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full sm:flex-1 py-3.5 sm:py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  form="certificate-form"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-navy text-white py-3.5 sm:py-4 rounded-xl font-bold hover:bg-gold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Record'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}