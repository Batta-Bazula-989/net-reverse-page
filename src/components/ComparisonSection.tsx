import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, Minus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const comparisonRows = [
  { key: 'whatYouGet', highlight: false },
  { key: 'compare3', highlight: true },
  { key: 'unifiedReport', highlight: true },
  { key: 'deepUnderstanding', highlight: false },
  { key: 'multiFormat', highlight: true },
  { key: 'recommendations', highlight: false },
  { key: 'manualEffort', highlight: false },
  { key: 'speed', highlight: false },
  { key: 'howItWorks', highlight: false },
  { key: 'bestFor', highlight: false },
];

const columns = ['insight', 'meta', 'spy', 'manual'] as const;

export const ComparisonSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const renderValue = (value: string) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'yes' || lowerValue === 'да' || lowerValue === 'так') {
      return (
        <span className="flex items-center gap-1.5 text-primary font-medium">
          <Check className="w-4 h-4" />
          {value}
        </span>
      );
    }
    if (lowerValue === 'no' || lowerValue === 'нет' || lowerValue === 'ні') {
      return (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Minus className="w-4 h-4" />
          {value}
        </span>
      );
    }
    return value;
  };

  if (isMobile) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-sm font-medium border border-primary/20">
              {t('comparison.eyebrow')}
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold leading-tight whitespace-pre-line">
              {t('comparison.heading')}
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {t('comparison.subheading')}
            </p>
          </div>

          {/* Mobile: Scrollable table */}
          <div className="overflow-x-auto -mx-4 px-4 pb-4">
            <div className="min-w-[900px]">
              <Card className="overflow-hidden shadow-soft">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-[180px] font-semibold text-foreground py-4">
                        {t('comparison.criteria')}
                      </TableHead>
                      <TableHead className="min-w-[160px] font-semibold text-primary bg-primary/5 py-4 border-l-2 border-primary/20">
                        {t('comparison.col.insight')}
                      </TableHead>
                      <TableHead className="min-w-[140px] font-semibold text-foreground py-4">
                        {t('comparison.col.meta')}
                      </TableHead>
                      <TableHead className="min-w-[140px] font-semibold text-foreground py-4">
                        {t('comparison.col.spy')}
                      </TableHead>
                      <TableHead className="min-w-[160px] font-semibold text-foreground py-4">
                        {t('comparison.col.manual')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonRows.map((row) => (
                      <TableRow 
                        key={row.key} 
                        className={row.highlight ? 'bg-primary/[0.03]' : ''}
                      >
                        <TableCell className={`font-medium py-4 ${row.highlight ? 'text-foreground' : 'text-foreground/90'}`}>
                          {t(`comparison.row.${row.key}`)}
                        </TableCell>
                        <TableCell className="py-4 bg-primary/5 border-l-2 border-primary/20">
                          {renderValue(t(`comparison.${row.key}.insight`))}
                        </TableCell>
                        <TableCell className="py-4 text-muted-foreground">
                          {renderValue(t(`comparison.${row.key}.meta`))}
                        </TableCell>
                        <TableCell className="py-4 text-muted-foreground">
                          {renderValue(t(`comparison.${row.key}.spy`))}
                        </TableCell>
                        <TableCell className="py-4 text-muted-foreground">
                          {renderValue(t(`comparison.${row.key}.manual`))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-sm font-medium border border-primary/20">
            {t('comparison.eyebrow')}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight whitespace-pre-line">
            {t('comparison.heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('comparison.subheading')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-soft">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[200px] font-semibold text-foreground py-5 px-6">
                    {t('comparison.criteria')}
                  </TableHead>
                  <TableHead className="font-semibold text-primary bg-primary/5 py-5 px-6 border-l-2 border-primary/20">
                    {t('comparison.col.insight')}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground py-5 px-6">
                    {t('comparison.col.meta')}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground py-5 px-6">
                    {t('comparison.col.spy')}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground py-5 px-6">
                    {t('comparison.col.manual')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow 
                    key={row.key} 
                    className={row.highlight ? 'bg-primary/[0.03]' : ''}
                  >
                    <TableCell className={`font-medium py-5 px-6 ${row.highlight ? 'text-foreground' : 'text-foreground/90'}`}>
                      {t(`comparison.row.${row.key}`)}
                    </TableCell>
                    <TableCell className="py-5 px-6 bg-primary/5 border-l-2 border-primary/20">
                      {renderValue(t(`comparison.${row.key}.insight`))}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-muted-foreground">
                      {renderValue(t(`comparison.${row.key}.meta`))}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-muted-foreground">
                      {renderValue(t(`comparison.${row.key}.spy`))}
                    </TableCell>
                    <TableCell className="py-5 px-6 text-muted-foreground">
                      {renderValue(t(`comparison.${row.key}.manual`))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </section>
  );
};
