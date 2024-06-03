import { OrgsInfo } from "@/components/pages/onboarding/OrgsInfo"
import { PersonalInfo } from "@/components/pages/onboarding/PersonalInfo"

const OnboardingSteps = [
    <PersonalInfo key='personal' />,
    <OrgsInfo key='orgs' />
]

export default function Onboarding() {
    
    return (
        <main className="relative h-full w-full flex flex-col items-center justify-center space-y-10">
            {OnboardingSteps[0]}
        </main>
    )
}