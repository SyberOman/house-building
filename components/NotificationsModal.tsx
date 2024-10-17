'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function NotificationsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const notifications = [
    { message: 'دفعة مستحقة لشركة البناء الحديث', amount: '50,000 ريال' },
    { message: 'موعد تسليم مواد العزل', date: 'بعد 3 أيام' },
    { message: 'تجاوز الميزانية في قسم التشطيبات', amount: '10,000 ريال' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>التنبيهات</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{notification.message}</span>
              <span>{notification.amount || notification.date}</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}