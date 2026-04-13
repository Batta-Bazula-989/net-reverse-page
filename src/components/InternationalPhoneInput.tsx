import { useState, useRef, useEffect, useCallback } from 'react';
import {
  PhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
} from 'react-international-phone';
import 'react-international-phone/style.css';
import { cn } from '@/lib/utils';
import { ChevronDown, Search } from 'lucide-react';

interface InternationalPhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  id?: string;
  hasError?: boolean;
  placeholder?: string;
}

const parsedCountries = defaultCountries.map((c) => parseCountry(c));

export const InternationalPhoneInput = ({
  value,
  onChange,
  id,
  hasError = false,
  placeholder,
}: InternationalPhoneInputProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIso2, setSelectedIso2] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  // Focus search when dropdown opens
  useEffect(() => {
    if (dropdownOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [dropdownOpen]);

  const filteredCountries = parsedCountries.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q.replace('+', '')) ||
      `+${c.dialCode}`.includes(q) ||
      c.iso2.toLowerCase().includes(q)
    );
  });

  const handleCountrySelect = useCallback(
    (iso2: string, dialCode: string) => {
      setSelectedIso2(iso2);
      setDropdownOpen(false);
      setSearch('');
      onChange(`+${dialCode}`);
    },
    [onChange]
  );

  // Detect country from current value for flag display
  const currentCountry = parsedCountries.find((c) => {
    if (!value || value.length < 2) return false;
    const digits = value.replace(/\D/g, '');
    return digits.startsWith(c.dialCode) && c.iso2 === selectedIso2;
  }) || (selectedIso2 ? parsedCountries.find((c) => c.iso2 === selectedIso2) : undefined);

  return (
    <div ref={wrapperRef} className={cn('intl-phone-wrapper relative', hasError && 'intl-phone-error')}>
      <div className="flex w-full">
        {/* Country selector button */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="intl-phone-country-btn-custom flex items-center gap-1 border border-input bg-background rounded-l-md px-2.5 h-10 hover:bg-muted transition-colors"
          style={{ borderRight: 'none' }}
          aria-label="Select country"
        >
          {currentCountry ? (
            <FlagImage iso2={currentCountry.iso2} size="24px" />
          ) : (
            <span className="w-6 h-4 bg-muted rounded-sm flex items-center justify-center text-xs text-muted-foreground">🌐</span>
          )}
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-muted-foreground transition-transform duration-200',
              dropdownOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Phone input */}
        <PhoneInput
          defaultCountry={selectedIso2 || 'ua'}
          value={value}
          onChange={(phone, meta) => {
            onChange(phone);
            if (meta?.country?.iso2) {
              setSelectedIso2(meta.country.iso2);
            }
          }}
          disableDialCodePrefill
          disableCountryGuess={false}
          forceDialCode={false}
          hideDropdown
          inputProps={{
            id,
            placeholder: placeholder || '+',
          }}
          inputClassName="intl-phone-input-standalone"
          countrySelectorStyleProps={{
            buttonClassName: 'intl-phone-hidden-btn',
          }}
        />
      </div>

      {/* Custom searchable dropdown */}
      {dropdownOpen && (
        <div className="absolute z-50 left-0 w-full mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden">
          {/* Search field */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-background border border-input rounded-md text-foreground outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
          </div>
          {/* Country list */}
          <div className="max-h-52 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="px-3 py-3 text-sm text-muted-foreground text-center">—</div>
            ) : (
              filteredCountries.map((c) => (
                <button
                  key={c.iso2}
                  type="button"
                  onClick={() => handleCountrySelect(c.iso2, c.dialCode)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors text-left',
                    selectedIso2 === c.iso2 && 'bg-primary/10'
                  )}
                >
                  <FlagImage iso2={c.iso2} size="20px" />
                  <span className="text-foreground flex-1 truncate">{c.name}</span>
                  <span className="text-muted-foreground">+{c.dialCode}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
