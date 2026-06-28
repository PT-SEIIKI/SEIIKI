'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  id?: string;
  type: string;
  label: string;
  value: string;
  icon?: string;
  order: number;
}

interface ContactInfoFormProps {
  contactInfo?: ContactInfo;
  onSuccess: () => void;
  mode: 'create' | 'edit';
}

const contactTypes = [
  { value: 'PHONE', label: 'Telepon' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'ADDRESS', label: 'Alamat' },
  { value: 'SOCIAL', label: 'Media Sosial' },
];

const iconOptions = [
  { value: 'Phone', label: 'Phone' },
  { value: 'Mail', label: 'Mail' },
  { value: 'MapPin', label: 'MapPin' },
  { value: 'MessageCircle', label: 'MessageCircle' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Facebook', label: 'Facebook' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Linkedin', label: 'Linkedin' },
];

export function ContactInfoForm({ contactInfo, onSuccess, mode }: ContactInfoFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ContactInfo>({
    type: contactInfo?.type || 'PHONE',
    label: contactInfo?.label || '',
    value: contactInfo?.value || '',
    icon: contactInfo?.icon || 'Phone',
    order: contactInfo?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === 'create' 
        ? '/api/admin/contact-info'
        : `/api/admin/contact-info/${contactInfo?.id}`;
      
      const method = mode === 'create' ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save contact info');
      }

      toast({
        title: 'Berhasil',
        description: `Kontak info ${mode === 'create' ? 'ditambahkan' : 'diperbarui'} dengan sukses`,
      });
      
      setOpen(false);
      onSuccess();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menyimpan kontak info',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kontak
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Tambah Kontak Info' : 'Edit Kontak Info'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Tipe Kontak*</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe kontak" />
                </SelectTrigger>
                <SelectContent>
                  {contactTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <Select 
                value={formData.icon} 
                onValueChange={(value) => setFormData({ ...formData, icon: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="label">Label*</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="contoh: WhatsApp Customer Service"
              required
            />
          </div>
          
          <div>
          
          <div>
            <Label htmlFor="order">Urutan</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              min="0"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'create' ? 'Tambah' : 'Simpan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}