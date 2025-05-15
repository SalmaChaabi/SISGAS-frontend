import { NotificationType } from "../../services/notifications/types";

interface Props {
  notification: NotificationType | null;
  onClose: () => void;
}

const notificationModal = ({ notification, onClose }: Props) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-2">Détail Notification</h2>
        <p className="mb-2">{notification.message}</p>
        <p className="text-sm text-gray-600 mb-2">
          Date : {new Date(notification.dateNotification || "").toLocaleString()}
        </p>
        {notification.reclamation && typeof notification.reclamation !== "string" && (
          <p className="text-sm mb-1">🔧 Réclamation : {notification.reclamation.titre}</p>
        )}
        {notification.actionCorrective && typeof notification.actionCorrective !== "string" && (
          <p className="text-sm mb-1">✅ Action corrective : {notification.actionCorrective.description}</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default notificationModal;
