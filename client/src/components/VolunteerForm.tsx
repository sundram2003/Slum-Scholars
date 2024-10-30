import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { useToast, Toast } from './ui/use-toast';

interface VolunteerFormData {
  fullName: string;
  currentAddress: string;
  permanentAddress: string;
  aadharNumber: string;
  phoneNumber: string;
  activity: string;
  dateOfBirth: string;
  qualification: string;
  otherQualifications: string;
  email: string;
}

const VolunteerForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast, showToast } = useToast();
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    currentAddress: '',
    permanentAddress: '',
    aadharNumber: '',
    phoneNumber: '',
    activity: '',
    dateOfBirth: '',
    qualification: '12th Pass',
    otherQualifications: '',
    email: '',
  });
  const [aadharError, setAadharError] = useState('');

  const activities = ['Marketing', 'Management', 'Teaching', 'Technical'];
  const qualifications = ['12th Pass', '10th Pass', 'Graduate', 'Post Graduate'];

  const validateAadhar = (aadhar: string): boolean => {
    const cleanAadhar = aadhar.replace(/\D/g, '');
    
    if (cleanAadhar.length !== 12) {
      setAadharError('Aadhaar number must be exactly 12 digits');
      return false;
    }

    if (/^[0-1]/.test(cleanAadhar)) {
      setAadharError('Aadhaar number cannot start with 0 or 1');
      return false;
    }

    if (/^(.)\1+$/.test(cleanAadhar)) {
      setAadharError('Invalid Aadhaar number format');
      return false;
    }

    setAadharError('');
    return true;
  };

  const formatAadhar = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const matches = cleaned.match(/^(\d{4})(\d{4})(\d{4})$/);
    
    if (matches) {
      return `${matches[1]} ${matches[2]} ${matches[3]}`;
    }
    
    return cleaned;
  };

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    const formattedValue = formatAadhar(value);
    setFormData({ ...formData, aadharNumber: formattedValue });
    validateAadhar(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanAadhar = formData.aadharNumber.replace(/\D/g, '');
    if (!validateAadhar(cleanAadhar)) {
      showToast({
        title: 'Error',
        description: 'Please enter a valid Aadhaar number',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.activity) {
      showToast({
        title: 'Error',
        description: 'Please select an activity.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const submitData = {
        ...formData,
        aadharNumber: formData.aadharNumber.replace(/\s/g, '')
      };
      
      const response = await fetch('http://localhost:4000/api/v1/volunteer', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast({
          title: 'Success!',
          description: 'Your volunteer application has been submitted successfully.',
        });
        setIsOpen(false);
        setFormData({
          fullName: '',
          currentAddress: '',
          permanentAddress: '',
          aadharNumber: '',
          phoneNumber: '',
          activity: '',
          dateOfBirth: '',
          qualification: '12th Pass',
          otherQualifications: '',
          email: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showToast({
        title: 'Error',
        description: error.message || 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
      >
        Apply Now
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* custom dialog content  */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Volunteer Application</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <Input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Current Address</label>
                <Input
                  required
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Permanent Address</label>
                <Input
                  required
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Aadhaar Number</label>
                <Input
                  required
                  value={formData.aadharNumber}
                  onChange={handleAadharChange}
                  placeholder="XXXX XXXX XXXX"
                  className={aadharError ? 'border-red-500' : ''}
                />
                {aadharError && (
                  <p className="text-red-500 text-sm mt-1">{aadharError}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Phone Number</label>
                <Input
                  required
                  pattern="[0-9]{10}"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Activity</label>
                <Select
                  value={formData.activity}
                  onValueChange={(value) => setFormData({...formData, activity: value})}
                >
                  {activities.map((activity) => (
                    <Select.Option key={activity} value={activity}>
                      {activity}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block mb-1">Date of Birth</label>
                <Input
                  required
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Qualification</label>
                <Select
                  value={formData.qualification}
                  onValueChange={(value) => setFormData({...formData, qualification: value})}
                >
                  {qualifications.map((qual) => (
                    <Select.Option key={qual} value={qual}>
                      {qual}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block mb-1">Other Qualifications</label>
                <Input
                  value={formData.otherQualifications}
                  onChange={(e) => setFormData({...formData, otherQualifications: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <Toast toast={toast} />
    </>
  );
};

export default VolunteerForm;