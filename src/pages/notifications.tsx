import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import NotificationModal from "../components/common/notficationModal";
import { NotificationType } from "../services/notifications/types";
import { getAllNotifications } from "../services/notifications/getAllNotifications ";
import { markAsRead } from "../services/notifications/markAsRead";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<NotificationType | null>(null);

  const fetchNotifications = async () => {
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Erreur lors du chargement des notifications :", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOpenModal = async (notif: NotificationType) => {
    if (!notif.lu && notif._id) {
      await markAsRead(notif._id);
    }
    setSelectedNotif(notif);
    fetchNotifications(); // Refresh list
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">📨 Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.map((notif) => (
          <div key={notif._id} onClick={() => handleOpenModal(notif)} className="cursor-pointer">
            <NotificationCard notif={notif} />
          </div>
        ))}
      </div>

      <NotificationModal
        notification={selectedNotif}
        onClose={() => setSelectedNotif(null)}
      />
    </div>
  );
};

export default NotificationsPage;
