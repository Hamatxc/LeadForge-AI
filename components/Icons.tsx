
import React from 'react';

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const CampaignIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export const LeadsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const InboxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0l-8 5-8-5" />
  </svg>
);

export const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export const BillingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM4 8.5L12 13.5L20 8.5M12 20.5V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const GmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 7.268V16.73C22 17.54 21.46 18.23 20.73 18.48L12.73 21.48C12.26 21.65 11.74 21.65 11.27 21.48L3.27 18.48C2.54 18.23 2 17.54 2 16.73V7.268C2 6.578 2.45 5.968 3.11 5.678L11.11 2.678C11.63 2.488 12.37 2.488 12.89 2.678L20.89 5.678C21.55 5.968 22 6.578 22 7.268Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21.5V11L20.67 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11L3.33 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const PaypalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.068 21.3h3.422c.866 0 1.587-.22 2.163-.658.576-.439.865-1.03.865-1.774 0-.61-.19-1.125-.568-1.543-.379-.418-.89-.627-1.532-.627h-.497c-.3 0-.543-.024-.728-.072-.185-.048-.35-.144-.497-.288-.147-.144-.22-.336-.22-.576 0-.216.059-.384.177-.504.118-.12.285-.18.502-.18h.287c.854 0 1.564-.264 2.13-.792.568-.528.851-1.2.851-2.016 0-.636-.204-1.224-.612-1.764-.408-.54-.99-.81-1.745-.81H8.845c-.288 0-.533.024-.735.072-.202.048-.378.144-.528.288-.15.144-.224.336-.224.576 0 .216.06.384.18.504.12.12.288.18.504.18h.288c.453 0 .825.126 1.113.378.288.252.432.588.432.996 0 .408-.144.732-.432.972-.288.24-.66.36-1.116.36H9.132c-.866 0-1.587.22-2.163.658-.576.439-.865-1.03-.865-1.774 0 .61.19 1.125.568 1.543.379.418.89.627 1.532.627h.497c.3 0 .543.024.728-.072.185-.048.35-.144.497-.288.147-.144.22-.336-.22-.576 0-.216-.059-.384-.177-.504-.118-.12-.285-.18-.502-.18h-.287c-.854 0-1.564-.264-2.13-.792-.568-.528-.851-1.2-.851-2.016 0 .636.204 1.224.612 1.764.408.54.99.81 1.745.81h2.32c.622 0 1.137-.18 1.545-.54.408-.36.612-.816.612-1.368 0-.576-.216-1.044-.648-1.404-.432-.36-.99-.54-1.673-.54H9.132c-.866 0-1.587.22-2.163.658-.576.439-.865-1.03-.865-1.774 0 .61.19 1.125.568 1.543.379.418.89.627 1.532.627h.497c.3 0 .543.024.728-.072s.35-.144.497-.288c.147-.144.22-.336.22-.576 0-.216-.06-.384-.18-.504s-.288-.18-.504-.18h-.288c-.453 0-.825.126-1.113.378-.288.252-.432.588-.432.996 0 .408-.144.732-.432.972s-.66.36-1.116.36h-.813c-.866 0-1.587.22-2.163.658-.576-.439-.865-1.03-.865-1.774 0 .744.29 1.344.868 1.8.578.456 1.298.684 2.16.684z" />
    </svg>
);

export const VisaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img">
        <title>Visa</title>
        <rect width="38" height="24" rx="3" fill="#1A1F71"/>
        <path d="M12.972 16.2L10.37 8.1h2.597l2.602 8.1z" fill="#FFC107"/>
        <path d="M22.59 11.233c0-2.34-3.51-2.43-3.51-.734.001.535.917.923 1.546 1.139.628.217 1.964.694 1.964 1.742 0 .9-.974 1.32-1.92 1.32-.996 0-1.595-.216-2.22-.533l-.337 2.106c.55.267 1.45.452 2.45.452 2.597 0 4.02-1.385 4.02-3.159 0-1.53-1.428-2.338-3.528-2.972zm-8.214-.306c-.19-.48-1.03-1.002-1.92-1.259-.572-.162-.975-.246-.975-.589 0-.43.687-.735 1.5-.735.688 0 1.232.163 1.547.306l.337-1.942C14.072 6.182 13.23 6 12.09 6c-2.07 0-3.327 1.139-3.327 2.565 0 1.838 2.41 2.128 3.1 2.454.81.405.996.694.996 1.03 0 .563-.765.88-1.595.88-.74 0-1.386-.19-1.842-.428l-.337 2.05c.572.274 1.283.428 2.124.428 1.944 0 3.49-1.11 3.49-2.618a2.12 2.12 0 00-1.428-1.984zm14.164 5.272h2.24l1.45-8.1h-2.19l-.925 5.564-.135-.694-1.314-4.87h-2.24l-2.07 8.1h2.24l.512-2.31h2.124l.31 2.31zm-18.06-8.1l-1.428 8.1h2.1l1.428-8.1h-2.1z" fill="#fff"/>
    </svg>
);

export const MastercardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24"><path fill="#282828" d="M35.132.001H2.868C1.284.001 0 1.246 0 2.772v18.456C0 22.754 1.284 24 2.868 24h32.264C36.716 24 38 22.754 38 21.228V2.772C38 1.246 36.716.001 35.132.001z"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M20 12a4 4 0 01-5 3.464A4 4 0 0020 12z" fill="#FF5F00"/></svg>
);

export const AmexIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img">
        <title>American Express</title>
        <rect width="38" height="24" rx="3" fill="#0077CC"/>
        <path fill="#fff" d="M21.996 8.932h3.065L26.3 12l-1.239 3.068h-3.065L23.24 12l-1.244-3.068zM26.88 8.932h3.065l-1.24 3.068 1.24 3.068H26.88L28.12 12l-1.24-3.068zM17.062 8.932h1.564l2.164 6.136h-1.565l-.39-1.12h-2.164l-.39 1.12h-1.564l2.34-6.136zm-.194 3.96h1.96l-.98-2.778-.98 2.778zM12.02 8.932h3.81v1.12h-2.43v1.3h2.16v1.12h-2.2v1.4h2.47v1.12h-3.85V8.932z"/>
    </svg>
);

export const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const DocumentDownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 019 4.5zm5.707.707a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM19.5 9a.75.75 0 01.75.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM14.707 14.707a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM9 19.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zM4.293 14.707a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zM4.5 9a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 014.5 9zM4.293 4.293a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.293 5.353a.75.75 0 010-1.06zM12 6.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 6.75zM11.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM12 17.25a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75z" clipRule="evenodd" />
    </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
