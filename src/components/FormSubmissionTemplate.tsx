import * as React from 'react';

interface FormSubmissionTemplateProps {
    formData: Record<string, any>;
    collectionName: string;
}

const formatKeyName = (key: string) => {
    // Convert camelCase or raw strings to Title Case with spaces
    const result = key.replace(/([A-Z])/g, " $1");
    // Capitalize first letter
    const formatted = result.charAt(0).toUpperCase() + result.slice(1);
    return formatted.trim();
};

const FormSubmissionTemplate: React.FC<FormSubmissionTemplateProps> = ({
    formData,
    collectionName,
}) => {
    // Generate a nice title based on the collection name
    let formTitle = formatKeyName(collectionName);
    
    // Some manual overrides for standard form names to make them look better
    if (formTitle.toLowerCase().includes('enquiry')) formTitle = 'Enquiry Form';
    else if (formTitle.toLowerCase().includes('trialclass')) formTitle = 'Trial Class Request';
    else if (formTitle.toLowerCase().includes('contact')) formTitle = 'Contact Request';
    else if (!formTitle.toLowerCase().includes('form')) formTitle += ' Submission';

    const { fileUrl, createdAt, file, ...otherData } = formData;
    
    // Filter out undefined, null, or empty string values
    const entries = Object.entries(otherData).filter(
        ([, value]) => value !== undefined && value !== null && value !== ''
    );

    return (
        <div style={{
            fontFamily: "'Montserrat', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            backgroundColor: "#f4f7f4", // Very faint green tint background
            padding: "40px 20px",
            color: "#18181b",
        }}>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 10px 25px -5px rgba(71, 130, 13, 0.1), 0 8px 10px -6px rgba(71, 130, 13, 0.1)", // Subtle green shadow
                border: "1px solid #e0e9df",
            }}>
                {/* Header Sequence */}
                <div style={{ padding: "32px 40px", textAlign: "center", backgroundColor: "#ffffff" }}>
                    <img 
                        src="https://athayogliving.com/images/Logo.png" 
                        alt="Athayog Living Logo" 
                        style={{ height: "70px", width: "auto", margin: "0 auto 0 auto", display: "block" }}
                    />
                </div>
                
                <div style={{
                    backgroundColor: "#47820D", // Athayog Brand Primary Green
                    padding: "24px 40px",
                    textAlign: "center",
                }}>
                    <h1 style={{
                        color: "#ffffff",
                        fontSize: "22px",
                        margin: 0,
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        fontFamily: "'Josefin Sans', sans-serif"
                    }}>
                        New {formTitle}
                    </h1>
                </div>

                {/* Content Sequence */}
                <div style={{ padding: "40px" }}>
                    <p style={{
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#4b5563",
                        marginTop: 0,
                        marginBottom: "32px",
                        textAlign: "center",
                    }}>
                        You have received a new form submission from the website. Please review the details below.
                    </p>

                    <div style={{
                        backgroundColor: "#fafcf9", // Exceedingly light green
                        borderRadius: "12px",
                        border: "1px solid #e6efe5",
                        padding: "24px",
                    }}>
                        {entries.map(([key, value]) => (
                            <div key={key} style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #e6efe5" }}>
                                <div style={{
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    color: "#47820D", // Primary Green for labels
                                    fontWeight: "700",
                                    letterSpacing: "0.08em",
                                    marginBottom: "6px"
                                }}>
                                    {formatKeyName(key)}
                                </div>
                                <div style={{
                                    fontSize: "16px",
                                    color: "#111827",
                                    fontWeight: "500",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word"
                                }}>
                                    {String(value)}
                                </div>
                            </div>
                        ))}
                        
                        {fileUrl && (
                            <div style={{ marginBottom: createdAt ? "20px" : "0", paddingBottom: createdAt ? "20px" : "0", borderBottom: createdAt ? "1px solid #e6efe5" : "none" }}>
                                <div style={{
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    color: "#47820D",
                                    fontWeight: "700",
                                    letterSpacing: "0.08em",
                                    marginBottom: "8px"
                                }}>
                                    Attached Documentation
                                </div>
                                <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{
                                    display: "inline-block",
                                    backgroundColor: "#47820D",
                                    color: "#ffffff",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    fontSize: "14px"
                                }}>
                                    View Attached File &rarr;
                                </a>
                            </div>
                        )}
                        
                        {createdAt && (
                            <div style={{ marginTop: fileUrl ? "0" : "0" }}>
                                <div style={{
                                    fontSize: "12px",
                                    textTransform: "uppercase",
                                    color: "#6b7280",
                                    fontWeight: "700",
                                    letterSpacing: "0.08em",
                                    marginBottom: "6px"
                                }}>
                                    Submission Timestamp
                                </div>
                                <div style={{
                                    fontSize: "15px",
                                    color: "#4b5563",
                                    fontWeight: "500",
                                }}>
                                    {new Date(createdAt).toLocaleString('en-IN', { 
                                        timeZone: 'Asia/Kolkata',
                                        dateStyle: 'long',
                                        timeStyle: 'short'
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Sequence */}
                <div style={{
                    backgroundColor: "#f4f7f4",
                    padding: "24px 40px",
                    borderTop: "1px solid #e6efe5",
                    textAlign: "center",
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#6b7280",
                    }}>
                        &copy; {new Date().getFullYear()} Athayog Living. All rights reserved.
                        <br />
                        <span style={{ fontSize: "12px", marginTop: "4px", display: "inline-block" }}>
                            Securely transmitted via your website forms.
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FormSubmissionTemplate;
