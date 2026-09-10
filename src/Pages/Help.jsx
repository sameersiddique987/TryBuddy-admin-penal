// import { useState } from "react";
// import { 
//   HiOutlineQuestionMarkCircle, 
//   HiOutlineMail, 
//   HiOutlineChatAlt2, 
//   HiOutlineBookOpen,
//   HiOutlineChevronDown,
//   HiOutlineLightningBolt
// } from "react-icons/hi";
// import Swal from 'sweetalert2';

// function Help() {
//   const [activeFaq, setActiveFaq] = useState(null);
  

//   const faqs = [
//     {
//       q: "Product ki image upload nahi ho rahi, kya karoon?",
//       a: "Bhai, check karein ki image ka size 5MB se kam ho aur format JPG ya PNG ho. Agar phir bhi masla hai toh internet connection check karein."
//     },
//     {
//       q: "Order status 'Completed' kab mark karna chahiye?",
//       a: "Jab aapko confirmation mil jaye ki customer ko parcel mil gaya hai aur payment receive ho chuki hai."
//     },
//     {
//       q: "Kya main ek se zyada admin add kar sakta hoon?",
//       a: "Ji haan! Settings mein ja kar 'Admin Management' (Coming Soon) se aap naye members add kar sakenge."
//     }
//   ];

//   const handleContactSupport = (e) => {
//     e.preventDefault();
//     Swal.fire({
//       icon: 'success',
//       title: 'Message Sent!',
//       text: 'Developer team aap se jald raabta karegi.',
//       confirmButtonColor: '#2563eb',
//     });
//   };


//   return (
//     <div className="p-5 pt-24 md:pt-8 bg-gray-100 min-h-screen">
//       {/* Header */}
//       <div className="mb-8 text-center md:text-left">
//         <h1 className="text-3xl font-black text-gray-800 tracking-tight italic uppercase">
//           Help & <span className="text-blue-600">Support</span>
//         </h1>
//         <p className="text-gray-500 text-sm font-bold">Kahin phans gaye hain? Hum aapki madad ke liye hazir hain!</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Side: FAQs & Guides */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Quick Stats/Alert */}
//           <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 flex items-center justify-between">
//             <div>
//               <h3 className="text-lg font-black flex items-center gap-2">
//                 <HiOutlineLightningBolt /> Quick Guide
//               </h3>
//               <p className="text-blue-100 text-sm mt-1 font-medium">Naye products add karne ke liye 'Add Product' tab ka istemal karein.</p>
//             </div>
//           </div>

//           {/* FAQ Section */}
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
//             <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-gray-800">
//               <span className="p-2 bg-blue-100 text-blue-600 rounded-xl"><HiOutlineQuestionMarkCircle /></span>
//               Frequently Asked Questions
//             </h2>
            
//             <div className="space-y-4">
//               {faqs.map((faq, index) => (
//                 <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden transition-all">
//                   <button 
//                     onClick={() => setActiveFaq(activeFaq === index ? null : index)}
//                     className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <span className="font-bold text-gray-700 text-sm">{faq.q}</span>
//                     <HiOutlineChevronDown className={`text-gray-400 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
//                   </button>
//                   {activeFaq === index && (
//                     <div className="p-4 bg-gray-50 text-gray-500 text-sm leading-relaxed border-t border-gray-100 animate-in fade-in duration-300">
//                       {faq.a}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Contact Support Form */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
//             <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-gray-800">
//               <span className="p-2 bg-green-100 text-green-600 rounded-xl"><HiOutlineChatAlt2 /></span>
//               Contact Us
//             </h2>
            
//             <form onSubmit={handleContactSupport} className="space-y-4">
//               <div>
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
//                 <input 
//                   type="text" 
//                   placeholder="Technical Issue"
//                   required
//                   className="w-full mt-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
//                 <textarea 
//                   rows="4" 
//                   placeholder="Describe your problem..."
//                   required
//                   className="w-full mt-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm"
//                 ></textarea>
//               </div>
//               <button className="w-full bg-gray-900 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
//                 <HiOutlineMail size={18} /> Send Message
//               </button>
//             </form>

//             <div className="mt-8 pt-8 border-t border-gray-100 text-center">
//               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Developer Contact</p>
//               <p className="text-sm font-bold text-blue-600 underline">support@trybuddy.com</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Help;


import { useState } from "react";
import { 
  HiOutlineQuestionMarkCircle, 
  HiOutlineMail, 
  HiOutlineChatAlt2, 
  HiOutlineBookOpen,
  HiOutlineChevronDown,
  HiOutlineLightningBolt
} from "react-icons/hi";
import Swal from 'sweetalert2';

function Help() {
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Form States
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");

  const faqs = [
    {
      q: "Product ki image upload nahi ho rahi, kya karoon?",
      a: "Bhai, check karein ki image ka size 5MB se kam ho aur format JPG ya PNG ho. Agar phir bhi masla hai toh internet connection check karein."
    },
    {
      q: "Order status 'Completed' kab mark karna chahiye?",
      a: "Jab aapko confirmation mil jaye ki customer ko parcel mil gaya hai aur payment receive ho chuki hai."
    },
    {
      q: "Kya main ek se zyada admin add kar sakta hoon?",
      a: "Ji haan! Settings mein ja kar 'Admin Management' (Coming Soon) se aap naye members add kar sakenge."
    }
  ];

  // ✅ WhatsApp Free Integration Logic
  const handleContactSupport = (e) => {
    e.preventDefault();

    // 1. Apna WhatsApp Number yahan likhein (Country code ke sath, bina + ke)
    const myNumber = "923XXXXXXXXX"; // 👈 Replace with your actual number

    // 2. Message Format karein
    const encodedMessage = `*TryBuddy Admin Support*%0A%0A` + 
                           `*Subject:* ${subject}%0A` + 
                           `*Message:* ${messageText}`;

    // 3. WhatsApp URL open karein
    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodedMessage}`;

    Swal.fire({
      icon: 'info',
      title: 'Opening WhatsApp...',
      text: 'Bhai, message ready hai, bas WhatsApp par Send dabana.',
      timer: 2000,
      showConfirmButton: false
    });

    // Choti delay ke baad redirect karein taaki user alert dekh sake
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1500);
  };


  return (
    <div className="p-5 pt-24 md:pt-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight italic uppercase">
          Help & <span className="text-blue-600">Support</span>
        </h1>
        <p className="text-gray-500 text-sm font-bold">Kahin phans gaye hain? Hum aapki madad ke liye hazir hain!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: FAQs & Guides */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Stats/Alert */}
          <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <HiOutlineLightningBolt /> Quick Guide
              </h3>
              <p className="text-blue-100 text-sm mt-1 font-medium">Naye products add karne ke liye 'Add Product' tab ka istemal karein.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-gray-800">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-xl"><HiOutlineQuestionMarkCircle /></span>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden transition-all">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-700 text-sm">{faq.q}</span>
                    <HiOutlineChevronDown className={`text-gray-400 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {activeFaq === index && (
                    <div className="p-4 bg-gray-50 text-gray-500 text-sm leading-relaxed border-t border-gray-100 animate-in fade-in duration-300">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact Support Form (WhatsApp) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-gray-800">
              <span className="p-2 bg-green-100 text-green-600 rounded-xl"><HiOutlineChatAlt2 /></span>
              Contact Us 
            </h2>
            
            <form onSubmit={handleContactSupport} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Technical Issue / Product Help"
                  required
                  className="w-full mt-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  rows="4" 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Bhai, kya masla aa raha hai?"
                  required
                  className="w-full mt-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-sm"
                ></textarea>
              </div>
              <button className="w-full bg-green-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                <HiOutlineChatAlt2 size={18} /> Send via WhatsApp
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Developer raabta</p>
              <p className="text-sm font-bold text-blue-600">Active Support 24/7</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Help;