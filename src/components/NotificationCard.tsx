import { NotificationType } from "../services/notifications/types";

const NotificationCard = ({ notif }: { notif: NotificationType }) => {
  return (
    <div className={`p-4 rounded-xl shadow border ${notif.lu ? "bg-white" : "bg-blue-100"}`}>
      <h3 className="font-semibold mb-1">{notif.message}</h3>
      <p className="text-sm text-gray-500">
        {new Date(notif.dateNotification || "").toLocaleString()}
      </p>
      {notif.reclamation && typeof notif.reclamation !== "string" && (
        <p className="text-sm">🔧 Réclamation : {notif.reclamation.titre}</p>
      )}
      {notif.actionCorrective && typeof notif.actionCorrective !== "string" && (
        <p className="text-sm">✅ Action : {notif.actionCorrective.description}</p>
      )}
    </div>
  );
};

export default NotificationCard;
