import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { InternationalPhoneInput } from '@/components/InternationalPhoneInput';
import { cn } from '@/lib/utils';
import { submitForm } from '@/lib/submitForm';

type PlanType = 'pilot' | 'standard' | 'business';

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanType | null;
  isYearly: boolean;
}

export const PlanSelectionModal = ({
  isOpen,
  onClose,
  selectedPlan,
  isYearly,
}: PlanSelectionModalProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState<PlanType | null>(selectedPlan);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; plan?: string }>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Update plan when selectedPlan prop changes
  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsSuccess(false);
        setSubmitError(false);
        setName('');
        setPhone('');
        setPlan(null);
        setErrors({});
        setDropdownOpen(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const getPlanOptions = () => {
    const pilotOption = t('planModal.option.pilot');
    const standardMonthly = t('planModal.option.standard.monthly');
    const standardYearly = t('planModal.option.standard.yearly');
    const businessMonthly = t('planModal.option.business.monthly');
    const businessYearly = t('planModal.option.business.yearly');

    return [
      { id: 'pilot' as PlanType, label: pilotOption },
      { id: 'standard' as PlanType, label: isYearly ? standardYearly : standardMonthly },
      { id: 'business' as PlanType, label: isYearly ? businessYearly : businessMonthly },
    ];
  };

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string; plan?: string } = {};

    if (!name.trim()) {
      newErrors.name = t('modal.error.name');
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      newErrors.phone = t('modal.error.phone');
    }

    if (!plan) {
      newErrors.plan = t('planModal.error.plan');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await submitForm({ name, phone, plan: plan ?? undefined, source: 'pricing_modal' });
      setIsSuccess(true);
    } catch (err) {
      console.error('[PlanSelectionModal]', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  const planOptions = getPlanOptions();
  const selectedPlanLabel = plan ? planOptions.find((p) => p.id === plan)?.label : '';

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
        isAnimating ? 'bg-black/60' : 'bg-black/0'
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6 sm:p-8 transition-all duration-300 ease-out',
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
        )}
        style={{ maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          /* Success State */
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg text-foreground">{t('planModal.success')}</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              {t('modal.close')}
            </Button>
          </div>
        ) : (
          /* Form State */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {t('planModal.title')}
              </h2>
              <p className="text-sm text-muted-foreground">{t('planModal.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="plan-name">{t('planModal.name')}</Label>
                <Input
                  id="plan-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={cn('bg-background', errors.name && 'border-destructive')}
                  placeholder={t('planModal.name')}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="plan-phone">{t('planModal.phone')}</Label>
                <InternationalPhoneInput
                  id="plan-phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  hasError={!!errors.phone}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              {/* Plan Dropdown */}
              <div className="space-y-2">
                <Label>{t('planModal.planLabel')}</Label>
                <div className="relative" data-dropdown>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 bg-background border rounded-md text-sm transition-colors',
                      errors.plan ? 'border-destructive' : 'border-input',
                      'hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring'
                    )}
                  >
                    <span className={plan ? 'text-foreground' : 'text-muted-foreground'}>
                      {selectedPlanLabel || t('planModal.selectPlan')}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-muted-foreground transition-transform duration-200',
                        dropdownOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
                      {planOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => {
                            setPlan(option.id);
                            setDropdownOpen(false);
                            if (errors.plan) {
                              setErrors((prev) => ({ ...prev, plan: undefined }));
                            }
                          }}
                          className={cn(
                            'w-full text-left px-3 py-3 text-sm transition-colors hover:bg-muted',
                            plan === option.id && 'bg-primary/10 text-primary font-medium'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.plan && <p className="text-sm text-destructive">{errors.plan}</p>}
              </div>

              {submitError && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t('modal.error.submit') || 'Something went wrong. Please try again.'}</span>
                </div>
              )}
              <Button type="submit" className="w-full py-6" disabled={isSubmitting}>
                {isSubmitting ? '...' : t('planModal.submit')}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
