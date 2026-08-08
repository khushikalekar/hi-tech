import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Upload,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  Loader2,
  Images,
  Plus,
  Tag,
  GripVertical,
  ZoomIn,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryPhoto, GalleryCategory } from '@/types';

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

async function compressImage(
  file: File,
  maxWidth = 1920,
  quality = 0.82
): Promise<File> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image file'));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            const compressed = new File(
              [blob],
              file.name.replace(/\.[^.]+$/, '.webp'),
              {
                type: 'image/webp',
              }
            );

            resolve(compressed);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export default function GalleryManagement() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [editing, setEditing] = useState<GalleryPhoto | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchPhotos = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery photos:', error);
      return;
    }

    if (data) {
      setPhotos(data as GalleryPhoto[]);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('gallery_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery categories:', error);
      return;
    }

    if (data) {
      setCategories(data as GalleryCategory[]);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all([fetchPhotos(), fetchCategories()]);
      setLoading(false);
    })();
  }, [fetchPhotos, fetchCategories]);

  const handleToggleVisible = async (photo: GalleryPhoto) => {
    const { error } = await supabase
      .from('gallery_photos')
      .update({
        is_visible: !photo.is_visible,
        updated_at: new Date().toISOString(),
      })
      .eq('id', photo.id);

    if (error) {
      console.error('Error updating visibility:', error);
      return;
    }

    fetchPhotos();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const photo = photos.find((p) => p.id === deleteId);

    if (photo) {
      const path = photo.image_url.split('/gallery/')[1];

      if (path) {
        const { error: storageError } = await supabase.storage
          .from('gallery')
          .remove([path]);

        if (storageError) {
          console.error('Error deleting image from storage:', storageError);
        }
      }
    }

    const { error } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('id', deleteId);

    if (error) {
      console.error('Error deleting gallery photo:', error);
      return;
    }

    setDeleteId(null);
    fetchPhotos();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-2xl text-navy-900">
            Gallery Management
          </h2>

          <p className="text-navy-500 mt-1">
            Upload, organize, and manage your photo gallery.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowCategories(true)}
            className="btn-ghost !py-2.5 text-sm"
          >
            <Tag className="h-5 w-5" />
            Categories
          </button>

          <button
            onClick={() => setShowUpload(true)}
            className="btn-primary !py-2.5 text-sm"
          >
            <Upload className="h-5 w-5" />
            Upload Photos
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-navy-100 shadow-soft">
          <p className="font-heading text-2xl font-bold text-navy-900">
            {photos.length}
          </p>
          <p className="text-xs text-navy-500">Total Photos</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-navy-100 shadow-soft">
          <p className="font-heading text-2xl font-bold text-emerald-600">
            {photos.filter((p) => p.is_visible).length}
          </p>
          <p className="text-xs text-navy-500">Visible</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-navy-100 shadow-soft">
          <p className="font-heading text-2xl font-bold text-gold-600">
            {photos.filter((p) => !p.is_visible).length}
          </p>
          <p className="text-xs text-navy-500">Hidden</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-navy-100 shadow-soft">
          <p className="font-heading text-2xl font-bold text-brand-600">
            {categories.length}
          </p>
          <p className="text-xs text-navy-500">Categories</p>
        </div>
      </div>

      {/* Photos */}
      {photos.length === 0 ? (
        <div className="text-center py-16 text-navy-500 bg-white rounded-2xl border border-navy-100">
          <Images className="h-12 w-12 mx-auto mb-3 text-navy-300" />
          <p>
            No photos yet. Click &quot;Upload Photos&quot; to add images to
            your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-white rounded-2xl border border-navy-100 shadow-soft overflow-hidden hover:shadow-medium transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-navy-50">
                <img
                  src={photo.image_url}
                  alt={photo.title}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    photo.is_visible ? '' : 'opacity-50'
                  }`}
                />

                {!photo.is_visible && (
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-navy-900/80 text-white text-xs font-medium flex items-center gap-1">
                    <EyeOff className="h-3 w-3" />
                    Hidden
                  </div>
                )}

                <button
                  onClick={() => setPreviewUrl(photo.image_url)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-navy-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-navy-900"
                  aria-label="Preview"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3">
                <p className="font-medium text-sm text-navy-900 line-clamp-1">
                  {photo.title}
                </p>

                <span className="badge bg-brand-50 text-brand-700 mt-1 text-xs">
                  {photo.category}
                </span>

                <p className="text-xs text-navy-400 mt-1">
                  Order: {photo.display_order}
                </p>

                <div className="flex items-center gap-1 mt-3">
                  <button
                    onClick={() => setEditing(photo)}
                    className="p-2 rounded-lg text-navy-600 hover:bg-navy-100 transition-colors"
                    aria-label="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleToggleVisible(photo)}
                    className={`p-2 rounded-lg transition-colors ${
                      photo.is_visible
                        ? 'text-emerald-600 hover:bg-emerald-50'
                        : 'text-navy-400 hover:bg-navy-100'
                    }`}
                    aria-label={photo.is_visible ? 'Hide' : 'Show'}
                  >
                    {photo.is_visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setDeleteId(photo.id)}
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          categories={categories}
          onClose={() => setShowUpload(false)}
          onDone={() => {
            setShowUpload(false);
            fetchPhotos();
          }}
          onCategoriesChanged={fetchCategories}
        />
      )}

      {/* Edit Modal */}
      {editing && (
        <EditModal
          photo={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            fetchPhotos();
          }}
        />
      )}

      {/* Categories Modal */}
      {showCategories && (
        <CategoriesModal
          categories={categories}
          onClose={() => setShowCategories(false)}
          onChanged={() => {
            fetchCategories();
            fetchPhotos();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setDeleteId(null)}
        >
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />

          <div
            className="relative bg-white rounded-2xl shadow-strong p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-red-50 mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>

              <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">
                Delete this photo?
              </h3>

              <p className="text-sm text-navy-500 mb-6">
                This action cannot be undone. The photo will be permanently
                removed.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setDeleteId(null)}
                  className="btn-ghost flex-1"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="btn-primary !bg-red-500 hover:!bg-red-600 flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm" />

          <button
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setPreviewUrl(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={previewUrl}
            alt="Preview"
            className="relative max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   UPLOAD MODAL
========================================================= */

interface UploadModalProps {
  categories: GalleryCategory[];
  onClose: () => void;
  onDone: () => void;
  onCategoriesChanged: () => void;
}

function UploadModal({
  categories,
  onClose,
  onDone,
  onCategoriesChanged,
}: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // IMPORTANT:
  // Store category ID, not category name.
  const [categoryId, setCategoryId] = useState(
    categories[0]?.id ?? ''
  );

  const [displayOrder, setDisplayOrder] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = Array.from(e.target.files ?? []);

    const valid: File[] = [];
    const errors: string[] = [];

    for (const file of selected) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(
          `${file.name}: unsupported format (use JPG, PNG, or WEBP)`
        );
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: exceeds 10 MB limit`);
        continue;
      }

      valid.push(file);
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
    } else {
      setError(null);
    }

    setFiles(valid);

    setPreviews(
      valid.map((file) => URL.createObjectURL(file))
    );
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);

    setFiles((current) =>
      current.filter((_, i) => i !== index)
    );

    setPreviews((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const handleAddCategory = async () => {
    const name = newCategory.trim();

    if (!name) return;

    const { data, error } = await supabase
      .from('gallery_categories')
      .insert({
        name,
        display_order: categories.length + 1,
      })
      .select()
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    // Automatically select newly created category.
    if (data?.id) {
      setCategoryId(data.id);
    }

    setNewCategory('');
    setShowNewCategory(false);

    onCategoriesChanged();
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one image.');
      return;
    }

    if (!categoryId) {
      setError('Please choose a category.');
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );

    if (!selectedCategory) {
      setError('Selected category was not found.');
      return;
    }

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const compressed = await compressImage(file);

        const ext =
          compressed.name.split('.').pop()?.toLowerCase() ??
          'webp';

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 10)}.${ext}`;

        /*
         * Keep storage organized by category name.
         */
        const filePath = `${selectedCategory.name}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, compressed, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw new Error(
            `Upload failed for ${file.name}: ${uploadError.message}`
          );
        }

        const { data: urlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        /*
         * IMPORTANT FIX:
         *
         * category_id = UUID/ID of gallery_categories row
         * category    = category name
         */
        const { error: dbError } = await supabase
          .from('gallery_photos')
          .insert({
            title: file.name.replace(/\.[^.]+$/, ''),
            description: null,

            // Required database column
            category_id: categoryId,

            // Keep category name for existing UI/code
            category: selectedCategory.name,

            image_url: urlData.publicUrl,
            is_visible: isVisible,
            display_order: displayOrder + i,
          });

        if (dbError) {
          // If database insert fails, remove uploaded file.
          await supabase.storage
            .from('gallery')
            .remove([filePath]);

          throw new Error(
            `Database error for ${file.name}: ${dbError.message}`
          );
        }

        setProgress(
          Math.round(((i + 1) / files.length) * 100)
        );
      }

      previews.forEach((preview) =>
        URL.revokeObjectURL(preview)
      );

      onDone();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Upload failed'
      );

      setUploading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-strong w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">
            Upload Photos
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* File selector */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-navy-200 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <Upload className="h-10 w-10 mx-auto mb-3 text-navy-300" />

            <p className="font-medium text-navy-700">
              Click to select images
            </p>

            <p className="text-sm text-navy-400 mt-1">
              JPG, PNG, or WEBP — max 10 MB each
            </p>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div>
              <p className="text-sm font-medium text-navy-700 mb-2">
                {files.length} image(s) selected
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-navy-100 group"
                  >
                    <img
                      src={src}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 p-1.5 rounded-lg bg-navy-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Category *
            </label>

            <div className="flex gap-2">
              <select
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value)
                }
                className={inputClass}
                disabled={categories.length === 0}
              >
                {categories.length === 0 ? (
                  <option value="">
                    No categories available
                  </option>
                ) : (
                  categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))
                )}
              </select>

              <button
                type="button"
                onClick={() =>
                  setShowNewCategory(!showNewCategory)
                }
                className="px-4 py-2.5 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors font-medium text-sm whitespace-nowrap"
              >
                <Plus className="h-4 w-4 inline" /> New
              </button>
            </div>

            {showNewCategory && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value)
                  }
                  placeholder="New category name"
                  className={inputClass}
                />

                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm whitespace-nowrap"
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Order + Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Starting Display Order
              </label>

              <input
                type="number"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
                    parseInt(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Visibility
              </label>

              <button
                type="button"
                onClick={() =>
                  setIsVisible(!isVisible)
                }
                className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isVisible
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-red-50 text-red-500 border border-red-200'
                }`}
              >
                {isVisible ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>

          {/* Progress */}
          {uploading && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-navy-600">
                  Uploading & compressing...
                </span>

                <span className="text-sm font-medium text-brand-600">
                  {progress}%
                </span>
              </div>

              <div className="w-full h-2 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 whitespace-pre-line">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1"
              disabled={uploading}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleUpload}
              disabled={
                uploading ||
                files.length === 0 ||
                !categoryId
              }
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Upload className="h-5 w-5" />
              )}

              Upload{' '}
              {files.length > 0 ? `(${files.length})` : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EDIT MODAL
========================================================= */

interface EditModalProps {
  photo: GalleryPhoto;
  categories: GalleryCategory[];
  onClose: () => void;
  onSaved: () => void;
}

function EditModal({
  photo,
  categories,
  onClose,
  onSaved,
}: EditModalProps) {
  const [title, setTitle] = useState(photo.title);
  const [description, setDescription] = useState(
    photo.description ?? ''
  );

  /*
   * Use category_id when available.
   * Fallback to finding it using the old category name.
   */
  const initialCategoryId =
    (photo as GalleryPhoto & { category_id?: string })
      .category_id ??
    categories.find(
      (category) => category.name === photo.category
    )?.id ??
    '';

  const [categoryId, setCategoryId] =
    useState(initialCategoryId);

  const [displayOrder, setDisplayOrder] = useState(
    photo.display_order
  );

  const [isVisible, setIsVisible] = useState(
    photo.is_visible
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    if (!categoryId) {
      setError('Please choose a category.');
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );

    if (!selectedCategory) {
      setError('Selected category was not found.');
      return;
    }

    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('gallery_photos')
      .update({
        title: title.trim(),
        description: description.trim() || null,

        // IMPORTANT FIX
        category_id: categoryId,

        // Keep category name synchronized
        category: selectedCategory.name,

        display_order: displayOrder,
        is_visible: isVisible,
        updated_at: new Date().toISOString(),
      })
      .eq('id', photo.id);

    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      onSaved();
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-strong w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">
            Edit Photo
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Image */}
          <div className="aspect-video rounded-xl overflow-hidden border border-navy-100 bg-navy-50">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Title *
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={3}
              placeholder="Optional description"
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1.5">
              Category *
            </label>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
              className={inputClass}
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Order + Visibility */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Display Order
              </label>

              <input
                type="number"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(
                    parseInt(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Visibility
              </label>

              <button
                type="button"
                onClick={() =>
                  setIsVisible(!isVisible)
                }
                className={`w-full px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isVisible
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-red-50 text-red-500 border border-red-200'
                }`}
              >
                {isVisible ? 'Visible' : 'Hidden'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost flex-1"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex-1 disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Edit2 className="h-5 w-5" />
              )}

              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CATEGORIES MODAL
========================================================= */

interface CategoriesModalProps {
  categories: GalleryCategory[];
  onClose: () => void;
  onChanged: () => void;
}

function CategoriesModal({
  categories,
  onClose,
  onChanged,
}: CategoriesModalProps) {
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [editName, setEditName] = useState('');
  const [editOrder, setEditOrder] = useState(0);

  const handleAdd = async () => {
    const name = newName.trim();

    if (!name) return;

    setAdding(true);
    setError(null);

    const { error } = await supabase
      .from('gallery_categories')
      .insert({
        name,
        display_order: categories.length + 1,
      });

    setAdding(false);

    if (error) {
      setError(error.message);
      return;
    }

    setNewName('');
    onChanged();
  };

  const handleDelete = async (
    id: string,
    name: string
  ) => {
    setError(null);

    /*
     * Check existing photos using this category.
     */
    const { count, error: countError } =
      await supabase
        .from('gallery_photos')
        .select('*', {
          count: 'exact',
          head: true,
        })
        .eq('category_id', id);

    if (countError) {
      setError(countError.message);
      return;
    }

    if ((count ?? 0) > 0) {
      setError(
        `Cannot delete "${name}" — ${count} photo(s) use this category. Move them first.`
      );
      return;
    }

    const { error } = await supabase
      .from('gallery_categories')
      .delete()
      .eq('id', id);

    if (error) {
      setError(error.message);
      return;
    }

    onChanged();
  };

  const handleSaveEdit = async (id: string) => {
    const name = editName.trim();

    if (!name) {
      setError('Category name is required.');
      return;
    }

    const { error } = await supabase
      .from('gallery_categories')
      .update({
        name,
        display_order: editOrder,
      })
      .eq('id', id);

    if (error) {
      setError(error.message);
      return;
    }

    setEditingId(null);
    setError(null);
    onChanged();
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all text-navy-800 placeholder-navy-400';

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-strong w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm flex items-center justify-between p-5 border-b border-navy-100 z-10">
          <h3 className="font-heading font-bold text-xl text-navy-900">
            Categories
          </h3>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {/* Existing categories */}
          {categories.map((category) => (
            <div key={category.id}>
              {editingId === category.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) =>
                      setEditName(e.target.value)
                    }
                    className={inputClass}
                  />

                  <input
                    type="number"
                    value={editOrder}
                    onChange={(e) =>
                      setEditOrder(
                        parseInt(e.target.value) || 0
                      )
                    }
                    className={inputClass + ' w-20'}
                  />

                  <button
                    onClick={() =>
                      handleSaveEdit(category.id)
                    }
                    className="px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl border border-navy-100 hover:bg-navy-50/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-navy-300" />

                    <span className="font-medium text-sm text-navy-900">
                      {category.name}
                    </span>

                    <span className="text-xs text-navy-400">
                      ({category.display_order})
                    </span>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingId(category.id);
                        setEditName(category.name);
                        setEditOrder(
                          category.display_order
                        );
                        setError(null);
                      }}
                      className="p-1.5 rounded-lg text-navy-600 hover:bg-navy-100 transition-colors"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          category.id,
                          category.name
                        )
                      }
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add category */}
          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newName}
              onChange={(e) =>
                setNewName(e.target.value)
              }
              placeholder="New category name"
              className={inputClass}
            />

            <button
              onClick={handleAdd}
              disabled={adding}
              className="px-4 py-2.5 bg-brand-50 text-brand-700 rounded-lg hover:bg-brand-100 transition-colors font-medium text-sm whitespace-nowrap disabled:opacity-60"
            >
              {adding ? (
                <Loader2 className="h-4 w-4 inline animate-spin" />
              ) : (
                <Plus className="h-4 w-4 inline" />
              )}{' '}
              Add
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}