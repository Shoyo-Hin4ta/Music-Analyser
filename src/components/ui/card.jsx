/* eslint-disable react/prop-types */
// src/components/ui/card.jsx
export const Card = ({ className = "", children }) => (
    <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
      {children}
    </div>
  );
  
  export const CardHeader = ({ className = "", children }) => (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
  
  export const CardTitle = ({ className = "", children }) => (
    <h3 className={`text-2xl font-semibold ${className}`}>
      {children}
    </h3>
  );
  
  export const CardContent = ({ className = "", children }) => (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );