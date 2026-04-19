import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { trackConsultationFormSubmit } from '@/utils/analytics';
import { InternationalPhoneInput } from '@/components/InternationalPhoneInput';
import { submitForm } from '@/lib/submitForm';

interface ConsultationFormProps {
  formGroup?: string;
  formId?: string;
  formSource?: string;
}

export const ConsultationForm = ({ 
  formGroup = 'home', 
  formId = 'home_bottom_form',
  formSource = 'home_cta' 
}: ConsultationFormProps) => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = t('modal.error.name');
    }
    
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone.trim() || phoneDigits.length < 10) {
      newErrors.phone = t('modal.error.phone');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const lang = language === 'ua' ? 'uk' : language;
      const pagePath = window.location.pathname;
      await submitForm({
        name,
        phone,
        form_group: formGroup,
        form_id: formId,
        form_source: formSource,
        language: lang,
        page_path: pagePath,
      });
      setIsSuccess(true);
      trackConsultationFormSubmit(formId, formGroup, formSource, lang, pagePath);
    } catch (err) {
      console.error('[ConsultationForm]', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-8">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <p className="text-lg text-foreground">
          {t('modal.success')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="cta-name">{t('modal.name')}</Label>
        <Input
          id="cta-name"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="bg-card"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="cta-phone">{t('modal.phone')}</Label>
        <InternationalPhoneInput
          id="cta-phone"
          value={phone}
          onChange={handlePhoneChange}
          hasError={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>
      {submitError && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{t('modal.error.submit') || 'Something went wrong. Please try again.'}</span>
        </div>
      )}
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {t('modal.submit')}
      </Button>
    </form>
  );
};
