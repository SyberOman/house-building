'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { PlusCircle, Bell } from 'lucide-react'
import StagesTab from './StagesTab'
import AgreementsTab from './AgreementsTab'
import PaymentsTab from './PaymentsTab'
import PurchasesTab from './PurchasesTab'
import AddPaymentModal from './AddPaymentModal'
import AddAgreementModal from './AddAgreementModal'
import AddPurchaseModal from './AddPurchaseModal'
import NotificationsModal from './NotificationsModal'

export default function Dashboard() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)

  const { data: projectData, isLoading, error } = useQuery(['project'], async () => {
    const response = await fetch('/api/projects')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  })

  if (isLoading) return <div>جاري التحميل...</div>
  if (error) return <div>حدث خطأ: {error.message}</div>
  if (!projectData || projectData.length === 0) return <div>لا توجد بيانات متاحة</div>

  const project = projectData[0] // Assuming we're working with the first project

  const totalBudget = project.budget
  const remainingBudget = totalBudget - (project.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0)
  const budgetProgress = ((totalBudget - remainingBudget) / totalBudget) * 100

  const completedStages = project.stages?.filter(stage => stage.status === 'completed').length || 0
  const totalStages = project.stages?.length || 0
  const currentStage = project.stages?.find(stage => stage.status === 'in_progress')?.name || 'غير متاح'

  const activeAgreements = project.agreements?.length || 0
  const agreementsTotal = project.agreements?.reduce((sum, agreement) => sum + agreement.amount, 0) || 0

  const directPurchases = project.purchases?.length || 0
  const purchasesTotal = project.purchases?.reduce((sum, purchase) => sum + purchase.amount, 0) || 0

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => setIsNotificationsModalOpen(true)}>
            <Bell className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsPaymentModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة دفعة جديدة
          </Button>
          <Button onClick={() => setIsAgreementModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة اتفاقية جديدة
          </Button>
          <Button onClick={() => setIsPurchaseModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> إضافة مشتريات مباشرة
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الميزانية الكلية</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBudget.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground">
              المتبقي: {remainingBudget.toLocaleString()} ريال
            </p>
            <Progress value={budgetProgress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المراحل المكتملة</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedStages}/{totalStages}</div>
            <p className="text-xs text-muted-foreground">
              المرحلة الحالية: {currentStage}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الاتفاقيات النشطة</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgreements}</div>
            <p className="text-xs text-muted-foreground">
              القيمة الإجمالية: {agreementsTotal.toLocaleString()} ريال
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشتريات المباشرة</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{directPurchases}</div>
            <p className="text-xs text-muted-foreground">
              القيمة الإجمالية: {purchasesTotal.toLocaleString()} ريال
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stages">المراحل</TabsTrigger>
          <TabsTrigger value="agreements">الاتفاقيات</TabsTrigger>
          <TabsTrigger value="payments">الدفعات الأخيرة</TabsTrigger>
          <TabsTrigger value="purchases">المشتريات المباشرة</TabsTrigger>
        </TabsList>
        <TabsContent value="stages">
          <StagesTab stages={project.stages} />
        </TabsContent>
        <TabsContent value="agreements">
          <AgreementsTab agreements={project.agreements} />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTab payments={project.payments} />
        </TabsContent>
        <TabsContent value="purchases">
          <PurchasesTab purchases={project.purchases} />
        </TabsContent>
      </Tabs>

      <AddPaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
      <AddAgreementModal isOpen={isAgreementModalOpen} onClose={() => setIsAgreementModalOpen(false)} />
      <AddPurchaseModal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)} />
      <NotificationsModal isOpen={isNotificationsModalOpen} onClose={() => setIsNotificationsModalOpen(false)} />
    </div>
  )
}