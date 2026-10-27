import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Phone, Github, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { validateContactForm, ContactInput } from '../utils/validation';
import { sound } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState<ContactInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successInfo, setSuccessInfo] = useState<{
    id: string;
    message: string;
  } | null>(null);

  const [sentLog, setSentLog] = useState<Array<{ id: string; subject: string; time: string }>>([]);

  const handleChange = (field: keyof ContactInput, val: string) => {
    sound.playKeyClick();
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playKeyClick();

    const validation = validateContactForm(form);
    if (!validation.isValid) {
      sound.playError();
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sound.playTransmission();
        setSuccessInfo({
          id: data.transmissionId,
          message: data.message
        });

        setSentLog((prev) => [
          {
            id: data.transmissionId,
            subject: form.subject,
            time: new Date().toLocaleTimeString()
          },
          ...prev
        ]);

        // Reset form
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          priority: 'normal'
        });
      } else {
        sound.playError();
        setErrors(data.errors || { server: data.error || 'Gateway transmission failed.' });
      }
    } catch (err) {
      sound.playError();
      setErrors({ server: 'Network connection error. Server gateway unreachable.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-4 sm:p-8 space-y-6">
      {/* Section Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-xs font-mono text-slate-400">GATEWAY: /DEV/PORT_3000/CONTACT</div>
        <h2 className="text-xl sm:text-3xl font-bold font-mono text-phosphor mt-1">
          AUTHENTICATED TRANSMISSION PORTAL
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
          Send a direct encrypted dispatch to Menahil Dastgir regarding software engineering, network monitoring, or cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Form Container */}
        <div className="lg:col-span-7 bg-black/50 border border-white/10 rounded-lg p-4 sm:p-6 space-y-4">
          {successInfo && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500 rounded text-xs font-mono space-y-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>PACKET TRANSMISSION DISPATCHED SUCCESSFULLY</span>
              </div>
              <p className="text-emerald-200">
                Transmission ID: <span className="font-bold text-white">{successInfo.id}</span>
              </p>
              <p className="text-emerald-300/80">
                {successInfo.message}
              </p>
            </div>
          )}

          {errors.server && (
            <div className="p-3 bg-rose-950/60 border border-rose-500 rounded text-xs font-mono flex items-center gap-2 text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errors.server}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Transmitter Name */}
              <div className="space-y-1">
                <label className="text-slate-300 flex items-center justify-between">
                  <span>TRANSMITTER NAME *</span>
                  {errors.name && <span className="text-rose-400 text-[10px]">{errors.name}</span>}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Lead Engineer"
                  className="w-full bg-black/60 border border-white/15 focus:border-phosphor outline-hidden p-2 rounded text-slate-100 font-mono transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-slate-300 flex items-center justify-between">
                  <span>RETURN PROTOCOL (EMAIL) *</span>
                  {errors.email && <span className="text-rose-400 text-[10px]">{errors.email}</span>}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="e.g. operator@company.com"
                  className="w-full bg-black/60 border border-white/15 focus:border-phosphor outline-hidden p-2 rounded text-slate-100 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-slate-300 flex items-center justify-between">
                <span>PACKET SUBJECT *</span>
                {errors.subject && <span className="text-rose-400 text-[10px]">{errors.subject}</span>}
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="e.g. Sentinel Net Deployment Inquiry / DevOps Opportunity"
                className="w-full bg-black/60 border border-white/15 focus:border-phosphor outline-hidden p-2 rounded text-slate-100 font-mono transition-colors"
              />
            </div>

            {/* Priority Selector */}
            <div className="space-y-1.5">
              <label className="text-slate-300">DISPATCH PRIORITY LEVEL</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'normal', label: 'NORMAL PRIORITY' },
                  { id: 'urgent', label: 'HIGH URGENCY' },
                  { id: 'telemetry', label: 'SYSTEM INQUIRY' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      sound.playKeyClick();
                      setForm((prev) => ({ ...prev, priority: p.id as any }));
                    }}
                    className={`py-1.5 px-2 text-[11px] rounded border font-mono transition-colors cursor-pointer ${
                      form.priority === p.id
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label className="text-slate-300 flex items-center justify-between">
                <span>PAYLOAD DATA (MESSAGE) *</span>
                <span className="text-slate-500 text-[10px]">{form.message.length}/3000 chars</span>
              </label>
              {errors.message && <div className="text-rose-400 text-[10px]">{errors.message}</div>}
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Enter technical specifications, interview invitation, or questions regarding Menahil's network monitoring and DevOps background..."
                className="w-full bg-black/60 border border-white/15 focus:border-phosphor outline-hidden p-2.5 rounded text-slate-100 font-mono transition-colors"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs rounded transition-all shadow-[0_0_12px_rgba(51,255,51,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'ENCRYPTING & TRANSMITTING...' : 'TRANSMIT PACKET OVER GATEWAY'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Direct Channels & Session Dispatch Log */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          {/* Coordinates Card */}
          <div className="border border-white/10 bg-black/40 rounded-lg p-4 space-y-3">
            <h3 className="text-xs font-bold text-phosphor uppercase border-b border-white/10 pb-2 flex items-center gap-2">
              <Radio className="w-3.5 h-3.5" />
              <span>DIRECT OPERATOR COORDINATES</span>
            </h3>

            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-phosphor shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">BASE LOCATION</div>
                  <div>{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-phosphor shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">PRIMARY RETURN ADDRESS</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="hover:text-phosphor transition-colors break-all"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-phosphor shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">TELECOMMUNICATIONS</div>
                  <div>{PERSONAL_INFO.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Github className="w-4 h-4 text-phosphor shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-slate-500">REPOSITORY RECON</div>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-phosphor transition-colors"
                  >
                    github.com/{PERSONAL_INFO.githubHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Session Dispatch Log */}
          <div className="border border-white/10 bg-black/60 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-slate-400 font-bold">TRANSMISSION BUFFER</span>
              <span className="text-[10px] text-phosphor">PORT 3000 ACTIVE</span>
            </div>

            {sentLog.length === 0 ? (
              <div className="text-slate-500 py-3 text-center text-[11px]">
                No active dispatches submitted in this browser session. Fill the form to log your transmission.
              </div>
            ) : (
              <div className="space-y-1.5">
                {sentLog.map((log) => (
                  <div key={log.id} className="p-2 bg-black/80 rounded border border-white/5 text-[11px] space-y-0.5">
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>{log.id}</span>
                      <span className="text-slate-500">{log.time}</span>
                    </div>
                    <div className="text-slate-300 truncate">{log.subject}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
