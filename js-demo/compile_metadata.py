
import pprint
import glob
import os.path
import PIL.Image

GLOB = "bliss_h78_transp_png/*.png"
METANAME = 'BlissMetadata'

def width(fname):
    img = PIL.Image.open(fname)
    return img.size[0]

def allsyms():
    syms = glob.glob("%s/*.png" % (IMG_DIR,))
    syms = syms[::10]
    return [(basename(fname), fname, width(fname)) for fname in syms]

def basename(fname):
    return os.path.splitext(os.path.split(fname)[1])[0]

def compile_bliss_metadata():
    syms = glob.glob(GLOB)
    images = dict((basename(fname), fname) for fname in syms)
    widths = dict((basename(fname), width(fname)) for fname in syms)
    indicators = dict((ind, 1) for ind in images if ind.startswith('indicator_'))
    metadata = {'images': images, 'widths': widths, 'indicators': indicators}
    print "var %s = %s;" % (METANAME, pprint.pformat(metadata))

if __name__ == '__main__':
    compile_bliss_metadata()
