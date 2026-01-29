import { useState } from 'react'
import { Plus, Upload, FileVideo, FileText, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface AddCourseDialogProps {
    onCourseAdded: () => void
}

// Category and Subcategory structure
const categoryStructure = {
    'Teen Driver ED': [
        'Full Package',
        'Classroom Only',
        'Behind-the-Wheel',
        'Driving Lessons',
    ],
    'Adult Driver ED': [
        'Classroom Only',
        'Driving Lessons',
    ],
    'Road Test': [
        'DPS Authorized Complete Deal',
        'Practice Road Test',
        'DPS Authorized Road Test',
    ],
}

type CategoryKey = keyof typeof categoryStructure

export function AddCourseDialog({ onCourseAdded }: AddCourseDialogProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        category: '' as CategoryKey | '',
        subcategory: '',
        content: '',
        duration: '',
        fee: '',
    })
    const [materials, setMaterials] = useState<{ type: 'video' | 'ppt'; name: string }[]>([])
    const [mcqs, setMcqs] = useState<{ question: string; options: string[]; correctAnswer: number }[]>([])

    const handleCategoryChange = (value: CategoryKey) => {
        setFormData({ ...formData, category: value, subcategory: '' })
    }

    const handleAddMaterial = (type: 'video' | 'ppt') => {
        setMaterials([...materials, { type, name: `${type === 'video' ? 'Video' : 'PPT'} ${materials.length + 1}` }])
    }

    const handleRemoveMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index))
    }

    const handleAddMCQ = () => {
        setMcqs([...mcqs, { question: '', options: ['', '', '', ''], correctAnswer: 0 }])
    }

    const handleRemoveMCQ = (index: number) => {
        setMcqs(mcqs.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name || !formData.category || !formData.subcategory || !formData.duration) {
            alert('Please fill in all required fields')
            return
        }

        setLoading(true)

        try {
            // Map category/subcategory to the backend category format
            const categoryMap: Record<string, string> = {
                'Teen Driver ED-Full Package': 'teen-full-package',
                'Teen Driver ED-Classroom Only': 'teen-classroom-only',
                'Teen Driver ED-Behind-the-Wheel': 'teen-behind-the-wheel',
                'Teen Driver ED-Driving Lessons': 'teen-driving-lessons',
                'Adult Driver ED-Classroom Only': 'adult-classroom-only',
                'Adult Driver ED-Driving Lessons': 'adult-driving-lessons',
                'Road Test-DPS Authorized Complete Deal': 'road-test-complete-deal',
                'Road Test-Practice Road Test': 'road-test-practice',
                'Road Test-DPS Authorized Road Test': 'road-test-dps-authorized',
            }

            const categoryKey = `${formData.category}-${formData.subcategory}`

            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    content: formData.content,
                    fee: Number(formData.fee) || 0,
                    category: categoryMap[categoryKey] || 'teen-full-package',
                    duration: formData.duration,
                    materials,
                    mcqs,
                }),
            })

            if (response.ok) {
                setFormData({ name: '', category: '', subcategory: '', content: '', duration: '', fee: '' })
                setMaterials([])
                setMcqs([])
                setOpen(false)
                onCourseAdded()
            } else {
                const error = await response.json()
                alert(error.error || 'Failed to create course')
            }
        } catch (error) {
            console.error('Error creating course:', error)
            alert('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[#c83d18] hover:bg-[#b8350f] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                        Create a new driving course. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {/* Course Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Course Name *</Label>
                        <Input
                            id="name"
                            placeholder="e.g., Teen Complete Driving Package"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select
                            value={formData.category}
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(categoryStructure).map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Subcategory */}
                    <div className="space-y-2">
                        <Label>Subcategory *</Label>
                        <Select
                            value={formData.subcategory}
                            onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                            disabled={!formData.category}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={formData.category ? "Select a subcategory" : "Select category first"} />
                            </SelectTrigger>
                            <SelectContent>
                                {formData.category && categoryStructure[formData.category as CategoryKey]?.map((sub) => (
                                    <SelectItem key={sub} value={sub}>
                                        {sub}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Course Content */}
                    <div className="space-y-2">
                        <Label htmlFor="content">Course Content *</Label>
                        <Textarea
                            id="content"
                            placeholder="Describe what this course includes..."
                            rows={4}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    {/* Course Material Upload */}
                    <div className="space-y-3">
                        <Label>Course Material Upload</Label>
                        <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                            {/* Add Material Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddMaterial('video')}
                                    className="flex items-center gap-2"
                                >
                                    <FileVideo className="w-4 h-4" />
                                    Add Video
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAddMaterial('ppt')}
                                    className="flex items-center gap-2"
                                >
                                    <FileText className="w-4 h-4" />
                                    Add PPT
                                </Button>
                            </div>

                            {/* Materials List */}
                            {materials.length > 0 && (
                                <div className="space-y-2">
                                    {materials.map((material, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-slate-50 rounded-lg p-3"
                                        >
                                            <div className="flex items-center gap-2">
                                                {material.type === 'video' ? (
                                                    <FileVideo className="w-4 h-4 text-blue-600" />
                                                ) : (
                                                    <FileText className="w-4 h-4 text-orange-600" />
                                                )}
                                                <span className="text-sm">{material.name}</span>
                                                <span className="text-xs text-slate-400">
                                                    ({material.type.toUpperCase()})
                                                </span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveMaterial(index)}
                                                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                                            >
                                                ×
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {materials.length === 0 && (
                                <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                    <p className="text-sm text-slate-500">
                                        No materials added yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MCQ Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>MCQ Questions</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleAddMCQ}
                                className="flex items-center gap-2"
                            >
                                <HelpCircle className="w-4 h-4" />
                                Add MCQ
                            </Button>
                        </div>

                        {mcqs.length > 0 && (
                            <div className="space-y-3">
                                {mcqs.map((mcq, index) => (
                                    <div
                                        key={index}
                                        className="bg-slate-50 rounded-lg p-3 space-y-2"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-700">
                                                Question {index + 1}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveMCQ(index)}
                                                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                                            >
                                                ×
                                            </Button>
                                        </div>
                                        <Input
                                            placeholder="Enter question..."
                                            value={mcq.question}
                                            onChange={(e) => {
                                                const newMcqs = [...mcqs]
                                                newMcqs[index].question = e.target.value
                                                setMcqs(newMcqs)
                                            }}
                                        />
                                        <div className="space-y-2 mt-3">
                                            <span className="text-xs font-medium text-slate-600">Options (select correct answer):</span>
                                            {mcq.options.map((option, optIndex) => (
                                                <div key={optIndex} className="flex items-center gap-2">
                                                    <input
                                                        type="radio"
                                                        name={`mcq-${index}-correct`}
                                                        checked={mcq.correctAnswer === optIndex}
                                                        onChange={() => {
                                                            const newMcqs = [...mcqs]
                                                            newMcqs[index].correctAnswer = optIndex
                                                            setMcqs(newMcqs)
                                                        }}
                                                        className="w-4 h-4 text-[#c83d18] border-slate-300 focus:ring-[#c83d18]"
                                                    />
                                                    <Input
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => {
                                                            const newMcqs = [...mcqs]
                                                            newMcqs[index].options[optIndex] = e.target.value
                                                            setMcqs(newMcqs)
                                                        }}
                                                        className="flex-1 h-9"
                                                    />
                                                    {mcq.correctAnswer === optIndex && (
                                                        <span className="text-xs text-green-600 font-medium">✓ Correct</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {mcqs.length === 0 && (
                            <div className="text-center py-4 border-2 border-dashed border-slate-200 rounded-lg">
                                <HelpCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                <p className="text-sm text-slate-500">
                                    No MCQ questions added yet
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Course Duration */}
                    <div className="space-y-2">
                        <Label htmlFor="duration">Course Duration (hours) *</Label>
                        <Input
                            id="duration"
                            type="number"
                            placeholder="e.g., 32"
                            min="1"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>

                    {/* Course Fee (optional) */}
                    <div className="space-y-2">
                        <Label htmlFor="fee">Course Fee ($)</Label>
                        <Input
                            id="fee"
                            type="number"
                            placeholder="299"
                            min="0"
                            value={formData.fee}
                            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#c83d18] hover:bg-[#b8350f]"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Course'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
