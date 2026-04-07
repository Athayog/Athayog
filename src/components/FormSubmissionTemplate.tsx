import * as React from 'react';

interface FormSubmissionTemplateProps {
    formData: Record<string, any>;
    collectionName: string;
}

const formatKeyName = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    const formatted = result.charAt(0).toUpperCase() + result.slice(1);
    return formatted.trim();
};

const FormSubmissionTemplate: React.FC<FormSubmissionTemplateProps> = ({
    formData,
    collectionName,
}) => {
    const formTitles: Record<string, string> = {
        'trialClassesv2': 'Trial Class',
        'contactMessages': 'Contact Us',
        'enquiryFormsv2': 'General Enquiry',
        'academyFormv2': 'Academy App',
        'weightLossForm': 'Weight Loss Query',
        'workshopForm': 'Workshop Sign Up',
        'resume': 'Career App',
        'picnicForm': 'Picnic Sign Up',
        'deleteAccount': 'Account Deletion',
        'arambhaForm25': 'Yoga Ārambha 2025',
        'landingPageForm': 'Landing Page Lead',
    };

    const formTitle = formTitles[collectionName] || formatKeyName(collectionName);
    const { fileUrl, createdAt, file, ...otherData } = formData;
    
    const entries = Object.entries(otherData).filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
    );

    return (
        <div style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            backgroundColor: "#ffffff",
            padding: "8px", 
            color: "#18181b",
        }}>
            <div style={{
                maxWidth: "480px", // Extremely compact for strict mobile glanceability
                margin: "0 auto",
                border: "1px solid #e5e7eb",
                borderTop: "6px solid #47820D", // Athayog Green Line
                borderRadius: "8px",
                backgroundColor: "#ffffff"
            }}>
                {/* Compact Header */}
                <div style={{ 
                    padding: "16px 20px", 
                    backgroundColor: "#f9faf9", 
                    borderBottom: "1px solid #e5e7eb",
                    borderRadius: "8px 8px 0 0" 
                }}>
                    <h2 style={{ 
                        margin: 0, 
                        fontSize: "18px", 
                        color: "#111827",
                        fontWeight: "600" 
                    }}>
                        {formTitle}
                    </h2>
                </div>
                
                {/* Compact Content Map */}
                <div style={{ padding: "20px" }}>
                    {entries.map(([key, value]) => (
                        <div key={key} style={{ marginBottom: "14px" }}>
                            <span style={{ 
                                display: "block", 
                                fontSize: "11px", 
                                color: "#47820D", // Brand color for field labels
                                textTransform: "uppercase", 
                                fontWeight: "700",
                                letterSpacing: "0.04em",
                                marginBottom: "4px"
                            }}>
                                {formatKeyName(key)}
                            </span>
                            <span style={{ 
                                display: "block", 
                                fontSize: "15px", 
                                lineHeight: "1.4",
                                color: "#1f2937",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word" 
                            }}>
                                {String(value)}
                            </span>
                        </div>
                    ))}
                    
                    {fileUrl && (
                        <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px dashed #e5e7eb" }}>
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{
                                color: "#47820D",
                                textDecoration: "none",
                                fontWeight: "600",
                                fontSize: "14px",
                                display: "inline-block"
                            }}>
                                📎 View Attached Document
                            </a>
                        </div>
                    )}
                </div>
                
                {/* Minimal Footer */}
                {createdAt && (
                    <div style={{ 
                        padding: "12px 20px", 
                        backgroundColor: "#f9faf9", 
                        borderTop: "1px solid #e5e7eb",
                        borderRadius: "0 0 8px 8px",
                        fontSize: "12px",
                        color: "#6b7280"
                    }}>
                        Submitted: {new Date(createdAt).toLocaleString('en-IN', { 
                            timeZone: 'Asia/Kolkata', 
                            dateStyle: 'medium', 
                            timeStyle: 'short'
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormSubmissionTemplate;
