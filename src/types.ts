export interface EnterpriseProfile {
  name: string;
  industry: string;
  stage: '种子期' | '初创期' | '成长期' | '成熟期';
  description: string;
  keyTech: string[];
  competitors: string[];
  fundingStatus: string;
  revenue?: string;
  employeeCount?: string;
}

export interface GrowthMilestone {
  period: string;
  title: string;
  description: string;
  needs: string[];
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface SuccessCase {
  name: string;
  industry: string;
  achievement: string;
  similarity: number;
  image: string;
}

export interface ServiceMatch {
  type: 'fund' | 'financing' | 'security' | 'consulting' | 'policy';
  title: string;
  description: string;
  matchScore: number;
  details: string[];
}
