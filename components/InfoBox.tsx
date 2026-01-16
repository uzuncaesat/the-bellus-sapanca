import { Clock, AlertCircle, CheckCircle, XCircle, Users, Wine, Dog } from 'lucide-react';

interface InfoBoxProps {
  checkIn: string;
  checkOut: string;
  rules?: Array<{
    icon: string;
    text: string;
    type: 'prohibition' | 'requirement' | 'info';
  }>;
}

const ruleIconMap: Record<string, React.ComponentType<any>> = {
  XCircle,
  Users,
  Wine,
  Dog,
};

export default function InfoBox({ checkIn, checkOut, rules }: InfoBoxProps) {
  return (
    <div className="bg-beige-50 border border-beige-200 rounded-lg p-6 space-y-6">
      {/* Check-in/Check-out */}
      <div>
        <h3 className="text-xl font-semibold text-luxury-dark mb-4 flex items-center gap-2">
          <Clock size={24} className="text-whatsapp" />
          Giriş & Çıkış
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Giriş</p>
            <p className="text-lg font-semibold text-luxury-dark">{checkIn}</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Çıkış</p>
            <p className="text-lg font-semibold text-luxury-dark">{checkOut}</p>
          </div>
        </div>
      </div>

      {/* Rules */}
      {rules && rules.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-luxury-dark mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-whatsapp" />
            Önemli Kurallar
          </h3>
          <ul className="space-y-3">
            {rules.map((rule, index) => {
              const IconComponent = ruleIconMap[rule.icon] || AlertCircle;
              const colorClass =
                rule.type === 'prohibition'
                  ? 'text-red-600'
                  : rule.type === 'requirement'
                  ? 'text-green-600'
                  : 'text-blue-600';

              return (
                <li key={index} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                  <IconComponent size={20} className={`${colorClass} mt-0.5 flex-shrink-0`} />
                  <span className="text-gray-700">{rule.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
